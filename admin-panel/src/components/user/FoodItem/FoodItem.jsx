import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../../context/StoreContext';

const FoodItem = ({id,name,description,category,imageUrl,price}) => {

  const {increaseQty,decreaseQty,quantities} = useContext(StoreContext);

  return (
    <div className="col-12 col-lg-3 col-md-4 col-sm-6 d-flex mt-2 justify-content-center">
    <div className="card product-card" style={{ maxWidth: '320px' }}>
      <Link to={`food/${id}`}><img src={imageUrl} className="card-img-top" alt="Product Image" height={250} width={60} /></Link>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description.split(".")[0]}</p>
            <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0">&#8377;{price}</span>
                <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-half text-warning"></i>
                    <small className="text-muted">(4.5)</small>
                </div>
            </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light">
            <Link className="btn btn-primary btn-md" to={`/food/${id}`}>View</Link> 
            {quantities[id] > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary btn-sm" onClick={()=>decreaseQty(id)}><i className="bi bi-dash-circle"></i></button>
                <span className='fw-bold'>{quantities[id]}</span>
                <button className="btn btn-primary btn-sm" onClick={() => increaseQty(id)}><i className="bi bi-plus-circle"></i></button>
              </div>
            ) :(
              <button className="btn btn-primary btn-sm" onClick={() => increaseQty(id)}><i className="bi bi-plus-circle"></i></button>
            )}
            
        </div>
    </div>
</div>
  )
}

export default FoodItem