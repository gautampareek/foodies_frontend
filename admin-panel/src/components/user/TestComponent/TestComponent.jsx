import React from 'react'
import './TestComponent.css'

const TestComponent = ({id,name,description,category,imageUrl,price}) => {
  return (
    <div className="col-12 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
    <div className="container py-5">
  <div className="row justify-content-center">
    <div className="">
      <div className="card product-card border-0 rounded-4 shadow-sm">
        <div className="position-relative">
          <span className="badge bg-danger badge-custom">New Arrival</span>
          <div className="overflow-hidden">
            <img src={imageUrl} className="card-img-top product-image" height={300} width={60} alt="Product Image" />
          </div>
        </div>
        <div className="card-body p-4">
          <h5 className="card-title mb-3 fw-bold">{name}</h5>
          <p className="card-text text-muted mb-4">{description.split(".")[0]}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="price">&#8377;{price}</span>
            <button className="btn btn-custom text-white px-4 py-2 rounded-pill">
                Add to Cart
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default TestComponent