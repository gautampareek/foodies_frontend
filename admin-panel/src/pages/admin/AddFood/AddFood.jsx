import React, { useEffect, useState } from 'react'
import {assets} from '../../../assets/assets'
import { toast } from 'react-toastify';
import { addFoodItem } from '../../../services/FoodService';

const AddFood = () => {
    const [image,setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Biryani"
    });
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}));
    }
    useEffect(()=>{
        //console.log(data);
    },[data])
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        if(!image){
            toast.error("Please upload image for food item");
            return;
        }
        const formData = new FormData();
        formData.append("food",JSON.stringify(data));
        formData.append("file",image);
        try{
            setLoading(true); 
            const result = await addFoodItem(formData);
            console.log(result);
            debugger;
            if(result.status === 200){
                toast.success("Food item added successfully");
                setData({ name:"",
                    description:"",
                    price:"",
                    category:"Biryani"});
                    setImage(null);
            }else{
                toast.error("error adding food item");
            }
        }catch(error){
            console.log(error);
            toast.error("error adding food item");
        }finally{
            setLoading(false); 
        }
        console.log(data);
    }
  return (
    <div className="mx-2 mt-2">
    <div className="row mt-2">
        <div className="card col-md-4">
            <form className="card-body" onSubmit={onSubmitHandler}>
                <h2 className="text-center mb-4">Add Food Item</h2>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="upload-img" width={"98"} accept="image/*"/>
                    </label>
                    <input type="file" className="form-control" id="image" hidden 
                    onChange={e=>setImage(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" placeholder='Farmhouse Pizza' className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select name="category" id="category" className="form-control" onChange={onChangeHandler} value={data.category}>
                        <option value="Biryani">Biryani</option>
                        <option value="Cake">Cake</option>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Salad">Salad</option>
                        <option value="Shake">Shake</option>
                        <option value="Ice Cream">Ice Cream</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" placeholder='Enter description here..' id="description" rows="5" name='description' required onChange={onChangeHandler} value={data.description} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" placeholder='&#8377;200' className="form-control" id="price" required name='price' onChange={onChangeHandler} value={data.price} />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                        {loading ?  (<><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>):"Save"}</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default AddFood