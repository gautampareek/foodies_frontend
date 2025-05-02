import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getFoodList } from "../services/FoodService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});

    const increaseQty = (foodId) =>{
        setQuantities(prev =>({...prev, [foodId] : (prev[foodId] || 0)+1}));
    }
    const decreaseQty = (foodId) =>{
        setQuantities(prev =>({...prev, [foodId] : prev[foodId] > 0 ? prev[foodId]-1 : 0}));
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
        setQuantities
    };
    useEffect(() => {
        async function loadData() {
            await fetchList();
        }
        loadData();

    }, []);
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}