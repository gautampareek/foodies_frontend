import axios from "axios";

const CART_REST_API_BASE_URL = 'http://localhost:8080/api/cart';

export const increaseItemQuantity = async (foodId,token)=>{
    try{
   const response = await axios.post(CART_REST_API_BASE_URL,{foodId}
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
   }catch(error){
    console.log(error);
   }
};
export const decreaseItemQuantity = async (foodId,token)=>{
    try{
    const response = await axios.post(`${CART_REST_API_BASE_URL}/remove`,{foodId}
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
        console.log('error while decreasing qty',error);
    }
};
export const loadCartDataApi = async(token) =>{
    try{
        const response = await axios.get(CART_REST_API_BASE_URL
            ,{headers :{'Authorization':`Bearer ${token}`}});
            return response;
    }catch(error){
        console.log('error while loading data for cart',error);
    }
}
export const deleteFullItem = async (foodId,token)=>{
    try{
        debugger;
    const response = await axios.delete(`${CART_REST_API_BASE_URL}/removeItem/${foodId}`
        ,{headers :{'Authorization':`Bearer ${token}`}});
        return response;
    }catch(error){
       throw error;
    }
};
