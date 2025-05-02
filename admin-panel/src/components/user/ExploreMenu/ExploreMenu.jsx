import React, { useRef } from 'react'
import { categories } from '../../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
    const menuRef = useRef(null);
    const scrollLeft = ()=>{
        if(menuRef.current){
            menuRef.current.scrollBy({left : -200 , behavior:'smooth'});
        }
    }
    const scrollRight = ()=>{
        if(menuRef.current){
            menuRef.current.scrollBy({left:200,behavior:'smooth'});
        }
    }
  return (
   <div  className="explore-menu position-relative px-4">
    <h1 className="d-flex align-items-center justify-content-between">
        Explore Our Menu
        <div className="d-flex ">
            <i className='bi bi-arrow-left-circle scroll-icon active' onClick={scrollLeft}></i>
            <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
    </h1>
    <p>Explore curated list of dishes from top categories</p>
    <div ref={menuRef} className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list">
        {
            categories.map((item,index) =>{
                return(
                    <div key={index} className="text-center explore-menu-list-item" onClick={() => setCategory(prev => prev === item.category ? 'All' : item.category )}>
                        <img src={item.icon} alt='categoryItem' className={item.category === category ? 'rounded-circle active' :'rounded-circle'} height={188} width={188} />
                        <p className='mt-2 fw-bold'>{item.category}</p>
                    </div>
                )
            })
        }
    </div>
    <hr />
   </div>
  )
}

export default ExploreMenu