import axios from "axios";
import { toast } from "react-toastify";

const ORDER_REST_API_BASE_URL = 'http://localhost:8080/api/order';
export const createOrder = async (orderData,token)=>{
    try{
    const response = await axios.post(`${ORDER_REST_API_BASE_URL}/create`,orderData
        ,{headers :{'Authorization':`Bearer ${token}`}});
        if (response.status === 200 && response.data.razorPayOrderId) {
            return response.data;
        } else {
            throw new Error("Invalid response from server");
        }
    }catch(error){
        throw error;
    }
};
export const deleterOrder = async (orderId,token)=>{
    try{
        await axios.delete(`${ORDER_REST_API_BASE_URL}/${orderId}`
        ,{headers :{'Authorization':`Bearer ${token}`}});
    }catch(error){
        throw error;
    }
};
export const verifyrOrder = async (paymentData,token)=>{
    try{
        const response = await axios.post(`${ORDER_REST_API_BASE_URL}/verify`,paymentData
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
        throw error;
    }
};
export const getOrders = async (token)=>{
    try{
        const response = await axios.get(ORDER_REST_API_BASE_URL
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
        throw error;
    }
};
export const getAllOrders = async (token)=>{
    try{
        const response = await axios.get(`${ORDER_REST_API_BASE_URL}/all`
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
        throw error;
    }
};
export const updateOrderStatus = async (orderId,status,token)=>{
    try{
        const response = await axios.patch(`${ORDER_REST_API_BASE_URL}/status/${orderId}?status=${status}`
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
        throw error;
    }
};