import React, { useContext } from 'react'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../context/StoreContext';
import { calculateCartTotals } from '../../../util/CartUtil';

const PlaceOrder = () => {
    const { foodList,quantities,setQuantities} = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id] > 0);
       const {subTotal,shiping,tax,total} = calculateCartTotals(cartItems,quantities); 
    return (
        <div className="container mt-4">
             <div class="py-2 text-center">
                    <img class="d-block mx-auto mb-1" src={assets.logo} alt="" width="152" height="77" />
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
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
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
                    <form className="needs-validation" novalidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="John" required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Mon" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" id="phone" placeholder="9876543210" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email </label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">@</span>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                </div>

                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input type="text" className="form-control" id="country" placeholder=""  value="India" disabled required />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" placeholder="" required />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type="number" className="form-control" id="zip" placeholder="" required />
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