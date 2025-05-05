import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { getOrders } from '../../../services/OrderService';
import { assets } from '../../../assets/assets';

const MyOrder = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(token);
      setData(response.data);
    } catch (error) {
      console.log("Error while getting orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">My Orders</h3>
      <div className="row justify-content-center">
        {
          data.length > 0 ? data.map((order, index) => (
            <div className="card mb-3 p-3 shadow-sm" key={index}>
              <div className="d-flex align-items-center mb-2">
                <img src={assets.order} alt='order' height={48} width={48} className="me-3" />
                <div>
                  <h5 className="mb-1">Order #{index + 1}</h5>
                  <small className="text-muted">Status: <span className="fw-bold text-capitalize">{order.orderStatus}</span></small>
                </div>
              </div>
              <p className="mb-1 fw-bold">Items:</p>
              <ul className="mb-2">
                {order.orderdItems.map((item, idx) => (
                  <li key={idx}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Total: ₹{order.amount}</span>
                <button className="btn btn-sm btn-primary" onClick={fetchOrders}>
                  <i className="bi bi-arrow-clockwise me-1"></i>Refresh
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center mt-5">
              <h5>No orders found.</h5>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MyOrder;
