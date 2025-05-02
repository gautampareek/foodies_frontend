import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import TestComponent from '../TestComponent/TestComponent';

const FoodDisplay = ({category,searchText}) => {
    const { foodList } = useContext(StoreContext);
    const filterdFoodList = !searchText ? foodList.filter(food => category ==='All' || category === food.category) :
    foodList.filter(food => (category ==='All' && food.name.toLowerCase().includes(searchText.toLowerCase())) || (category === food.category && food.name.toLowerCase().includes(searchText.toLowerCase()))) ;
    return (
        <div className="container-fluid">
            <div className="row mx-2">
                {filterdFoodList.length > 0 ? (
                    filterdFoodList.map((item, index) => 
                        (
                        <FoodItem key={index} id={item.id} name={item.name} description={item.description} category={item.category} imageUrl={item.imageUrl} price={item.price} />
                        )
                    )
                ) : (
                    <div className="text-center mt-4">
                        <h4>No Food To Display</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay