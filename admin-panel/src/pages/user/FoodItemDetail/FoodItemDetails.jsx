import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getFoodById } from '../../../services/FoodService';
import './FoodItemDetail.css'
import { StoreContext } from '../../../context/StoreContext';

const FoodItemDetails = () => {
   const {id} = useParams();
   const[data,setData] = useState({});
   const {increaseQty,quantities,setQuantities} = useContext(StoreContext);
   const addToCart = () =>{
    increaseQty(id);
    toast.success("Item successfully added to cart");
   }
   useEffect(()=>{
    const loadFood = async (id) => {
        try{
            const foodData = await getFoodById(id);
                setData(foodData);
        }catch(error){
            toast.error("Error displaying food details");
        }
    };
    loadFood(id);
   },[id]);
  return (
    <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0 rounded transition-image" height={400} width={500} src={data.imageUrl} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="fs-5 mb-1">category:<span className='badge text-bg-warning'>{data.category}</span> </div>
                        <h1 className="display-4 fw-bolder">{data.name}</h1>
                        <div className="fs-5 mb-2">
                            <span>&#8377;{data.price}.00</span>
                        </div>
                        <p className="lead ">{data.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center me-3" placeholder="1" id="inputQuantity" type="num" value={quantities[id]} style={{"maxWidth": "3rem"}} />
                            <button className="btn btn-primary flex-shrink-0" type="button"  onClick={addToCart}>
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default FoodItemDetails