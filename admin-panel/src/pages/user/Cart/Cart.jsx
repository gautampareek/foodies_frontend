import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import { StoreContext } from '../../../context/StoreContext';
import { assets } from '../../../assets/assets';
import { toast } from 'react-toastify';
import { calculateCartTotals } from '../../../util/CartUtil';

const Cart = () => {
    const {foodList, increaseQty, decreaseQty, quantities,setQuantities} = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id] > 0);
   const {subTotal,shiping,tax,total} = calculateCartTotals(cartItems,quantities); 

    const handleRemove = (id) =>{
        setQuantities(prev => {
            const updatedQty = {...prev};
            delete updatedQty[id];
            toast.warn("Item removed from cart");
            return updatedQty;
        });
    }
  return (
    <div className="container py-5">
    <h1 className="mb-5">Your Shopping Cart</h1>
    <div className="row">
        <div className="col-lg-8">
            <div className="card mb-4">
                {
                    cartItems.length === 0 ? (
                        <div className="card-body d-flex flex-column align-items-center">
                            <h2>No items..</h2>
                            <img  src={assets.cartEmpty} alt='empty cart image' className='rounded' height={400} width={600} />
                        </div>
                    ):(
                    <div className="card-body ">
                        {
                            cartItems.map((food,index) => (
                                <div key={index} className="row cart-item mb-3">
                            <div className="col-md-3">
                                <img src={food.imageUrl} alt="Product 1" className="img-fluid rounded" />
                            </div>
                            <div className="col-md-5">
                                <h5 className="card-title">{food.name}</h5>
                                <p className="text-muted">Category: {food.category}</p>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group d-flex justify-content-between">
                                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={()=>decreaseQty(food.id)}><i className="bi bi-dash-circle"></i></button>
                                    {
                                   // <input style={{"maxWidth":"100"}} type="text" className="form-control  form-control-sm text-center quantity-input" />
                                     } 
                                     <span className='fw-bold'>{quantities[food.id]}</span>
                                     <button className="btn btn-secondary btn-sm" type="button" onClick={()=>increaseQty(food.id)}><i className="bi bi-plus-circle"></i></button>
                                </div>
                            </div>
                            <div className="col-md-2 text-end">
                                <p className="fw-bold">&#8377;{food.price * quantities[food.id]}</p>
                                <button className="btn btn-sm btn-outline-danger" onClick={()=>handleRemove(food.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                            </div>
                            <hr className='mt-2'/>
                        </div>
                            ))
                        }
                        

                    </div>
                    )
                }
                
            </div>
            <div className="text-start mb-4">
                <Link to="/" className="btn btn-outline-success">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
            </div>
        </div>
        <div className="col-lg-4">
            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>&#8377;{subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>&#8377;{shiping}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Tax</span>
                        <span>&#8377;{tax}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>&#8377;{total}</strong>
                    </div>
                    <Link className={cartItems.length > 0 ? "btn btn-primary w-100" : "btn btn-primary w-100 disabled"} to={"/placeOrder"}>Proceed to Checkout</Link>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Cart