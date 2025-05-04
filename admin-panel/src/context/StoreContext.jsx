import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getFoodList } from "../services/FoodService";
import { decreaseItemQuantity, increaseItemQuantity, loadCartDataApi } from "../services/CartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState("");

    const increaseQty = async(foodId) =>{
        setQuantities(prev =>({...prev, [foodId] : (prev[foodId] || 0)+1}));
        const response = await increaseItemQuantity(foodId,token);
            console.log("increase qty response",response.data);
    }
    const decreaseQty = async (foodId) =>{
        setQuantities(prev =>({...prev, [foodId] : prev[foodId] > 0 ? prev[foodId]-1 : 0}));
        const response = await decreaseItemQuantity(foodId,token);
            console.log("decrease qty response",response.data);
    }
    const loadCartData = async (token) =>{
       const response = await loadCartDataApi(token);
            setQuantities(response.data.items);
    }

    const fetchList = async () => {
        try {
            const response = await getFoodList();
            setFoodList(response.data);
        } catch (error) {
            console.log("error while calling getFoods APi in context", error);
        }
    }
    const contextValue = {
        foodList,
        increaseQty,
        decreaseQty,
        quantities,
        setQuantities,
        token,
        setToken,
        loadCartData
    };
    useEffect(() => {
        async function loadData() {
            await fetchList();
        }
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            loadCartData(localStorage.getItem('token'));
        }
        loadData();
       

    }, []);
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}