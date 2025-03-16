import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts'
import Itemdisplay from "../../components/itemdisplay/Itemdisplay"
import './MarketPlace.css'
const MarketPlace = () => {
  const [category,setCategory]=useState("All")
  return (
    <div>
      <Header />
      <ExploreProducts category={category} setCategory={setCategory}/>
      <Itemdisplay category={category}></Itemdisplay>
      
    </div>
  )
}

export default MarketPlace