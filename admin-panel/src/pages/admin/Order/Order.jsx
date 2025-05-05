import React, { useContext, useEffect, useState } from 'react'
import { getAllOrders, getOrders, updateOrderStatus } from '../../../services/OrderService';
import { StoreContext } from '../../../context/StoreContext';
import { assets } from '../../../assets/assets';
import { toast } from 'react-toastify';
import './Order.css'

const Order = () => {
    const { token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(token); // Assume it returns all orders for admin
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };
  const handleStatusChange = (e, orderId) => {
    const newStatus = e.target.value;
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status, token);
      toast.success("Order status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status");
    }
  };
  
    useEffect(() => {
      if (token) {
        fetchOrders();
      }
    }, [token]);
  return (
      <div className="container py-5">
        <h3 className="mb-4">Admin Orders Panel</h3>
        <div className="card">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Order</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Count</th>
                <th>User Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='justify-content-center'>
              {orders.map((order, idx) => (
                <tr key={idx}>
                  <td>
                    <img src={assets.order} alt="order" height={48} width={48} />
                  </td>
                  <td>
                    <div><strong>Items:</strong></div>
                    <ul className="mb-0 ps-3">
                      {order.orderdItems.map((item, i) => (
                        <li key={i}>{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.amount}</td>
                  <td>{order.orderdItems.length}</td>
                  <td>{order.email}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(e, order.id)}
                    >
                      <option value="processing">Processing</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleUpdateStatus(order.id, order.orderStatus)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Order