import React, { useEffect } from 'react'
import "./ExploreProducts.css"
import { products } from '../../assets/assets'
const ExploreProducts = ({category,setCategory}) => {
  return (
    <div className='exploreproducts' id='explore-products'>
      <h2>Explore Our Products</h2>
      <p className='explore-p'>Explore our range of high-quality products designed to enhance your everyday life. Quality, innovation, and reliability in every item.</p>
        <div className='products-list'>
            {products.map((p,i)=>(
                <div key={i} className='p-item' onClick={()=>{setCategory(c=>c===p.p_name?"All":p.category)}}>
                    <img src={p.p_image} className={category===p.p_name?"active":""} alt="" />
                    <p>{p.p_name}</p>
                   </div>
                   ))}
                   
        </div>
        <hr />
    </div>
  );
};
export default ExploreProducts
