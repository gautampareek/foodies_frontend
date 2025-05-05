import React, { useContext, useState } from 'react'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../context/StoreContext';
import { calculateCartTotals } from '../../../util/CartUtil';
import { createOrder, deleterOrder, verifyrOrder } from '../../../services/OrderService';
import { RAZORPAY_KEY } from '../../../util/Constants';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { clearCart } from '../../../services/CartService';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { foodList,quantities,setQuantities,token} = useContext(StoreContext);
   
    const cartItems = foodList.filter(food => quantities[food.id] > 0);
       const {subTotal,shiping,tax,total} = calculateCartTotals(cartItems,quantities); 
       const [data,setData] = useState({
        firstName : "",
        lastName : "",
        phoneNumber : "",
        email : "",
        address : "",
        country : "India",
        state : "",
        zip : "",
       });
       const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
      }
      const onSubmitHandler = async (e) => {
        debugger;
        e.preventDefault();
        const orderData = {
        userAddress : "testing",
        phoneNumber : data.phoneNumber,
        email : data.email,
        amount : parseFloat(total.toFixed(2)),
        orderStatus : "preparing",
        orderdItems : cartItems.map(item=>({
            name : item.name,
            description : item.description,
            imageUrl : item.imageUrl,
            category : item.category,
            price : parseFloat(item.price * quantities[item.id]),
            quantity : parseInt(quantities[item.id]),
            foodId : item.id
        }))

        }
        const response = await createOrder(orderData,token);
        console.log("This is the response".response);
        console.log("razorPayOrderId before RazorPay init", response.razorPayOrderId);
        initiateRazorPayMethod(response);

      }
      const initiateRazorPayMethod = async (order) =>{
        const options = {
            key : RAZORPAY_KEY,
            amount : order.amount * 100,
            currency : 'INR',
            name : 'Foodies',
            description : 'payment for order',
            order_id : order.razorPayOrderId,
            handler : async function(razorPayResponse){
                const paymentData = {
                    razorpay_payment_id : razorPayResponse.razorpay_payment_id,
                    razorpay_order_id : razorPayResponse.razorpay_order_id,
                    razorpay_signature : razorPayResponse.razorpay_signature
                }
                console.log("This is a token",token);
                const response = await verifyrOrder(paymentData,token);
                debugger;
                try{
                if(response.status == 200){
                    toast.success("Payment successful");
                    await clearCart(token);
                    setQuantities({});
                    navigate("/myOrder");
                }else{
                    toast.error("Payment Failed.Please try again");
                    navigate("/");
                }
            }catch(error){
                toast.error("Payment Failed.Please try again");
                console.log(error);
            }
            },
            prefill :{
                name : `${data.firstName} ${data.lastName}`,
                email : data.email,
                contact : data.phoneNumber
            },
            theme : {color : '#3399cc'},
            modal :{
                ondismiss : async function(){
                    toast.error("Payment Cancelled");
                    await deleterOrder(order.id,token);
                }
            }

        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    return (
        <div className="container mt-4">
             <div className="py-2 text-center">
                    <img className="d-block mx-auto mb-1" src={assets.logo} alt="" width="152" height="77" />
                </div>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-secondary">Your cart</span>
                        <span className="badge bg-secondary rounded-pill">{Object.values(quantities).filter(qty => qty > 0).length} </span>
                    </h4>
                    <ul className="list-group mb-3">
                        {
                            
                            cartItems.length > 0 ? (
                                <div>{
                                cartItems.map((food,index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">{food.name}</h6>
                                <small className="text-body-secondary">Qty : {quantities[food.id]}</small>
                            </div>
                            <span className="text-body-secondary">&#8377; {food.price * quantities[food.id]}</span>
                        </li>
                                ))
                            }
                        </div>
                            ) : (
                                <div>No items added</div>
                            )
                        }
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Shipping</span>
                            <strong>&#8377; {shiping}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Tax(10%)</span>
                            <strong>&#8377; {tax}</strong>
                        </li>
                        
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (INR)</span>
                            <strong>&#8377; {total}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" onSubmit={onSubmitHandler}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="John" required
                                name="firstName"
                                value={data.firstName}
                                onChange={onChangeHandler}
                                />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Mon" required
                                name="lastName"
                                value={data.lastName}
                                onChange={onChangeHandler}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="phone" placeholder="9876543210" required
                                name="phoneNumber"
                                value={data.phoneNumber}
                                onChange={onChangeHandler}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email </label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">@</span>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                    name="email"
                                    value={data.email}
                                    onChange={onChangeHandler}
                                    />
                                </div>

                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required 
                                name="address"
                                value={data.address}
                                onChange={onChangeHandler}
                                />
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input type="text" className="form-control" id="country" placeholder=""  disabled required 
                                name="country"
                                value={data.country}
                                onChange={onChangeHandler}
                                />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" placeholder="" required
                                name="state"
                                value={data.state}
                                onChange={onChangeHandler}
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type="number" className="form-control" id="zip" placeholder="" required 
                                name="zip"
                                value={data.zip}
                                onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                        <hr className="my-4 mb-2" />

                        <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>Proceed to Payment</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default PlaceOrder