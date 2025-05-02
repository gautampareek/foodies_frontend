import React, { useEffect, useState } from 'react'
import { deleteFoodItem, getFoodList } from '../../../services/FoodService';
import { toast } from 'react-toastify';
import './ListFood.css'

const ListFood = () => {
  const [list,setList] = useState([]);
  const fetchList = async () =>{
    const response = await getFoodList();
    console.log(response.data);
    if(response.status === 200){
      setList(response.data);
    }else{
      toast.error("error while loading food items");
    }
  };
  useEffect(()=>{
    fetchList();
  },[]);
  const removeFood = async (id) =>{
    const response = await deleteFoodItem(id);
    if(response.status === 204){
      await fetchList();
      toast.success("Food Item removed Successfully");
    }else{
      toast.error("Couldn't remove Item. Try Again");
    }
  }
  return (
   <div className="py-5 row justify-content-center">
    <div className="col-11 card">
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
         list.map((item,index) => {
          return (
            <tr key={index}>
            <td>
            <img src={item.imageUrl} height={50} width={50} />
            </td>
            <td> {item.name}</td>
            <td>{item.category}</td>
            <td>&#8377;{item.price}.00</td>
            <td className='text-danger'>
              <i className='bi bi-x-circle' onClick={()=>removeFood(item.id)}></i>
            </td>
            </tr>
          )
         })
         }
        </tbody>
      </table>
    </div>
   </div>
  )
}

export default ListFood