import React, { useContext } from 'react'
import "./itemdisplay.css"
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
const Itemdisplay = ({category}) => {
  const {itemlist}=useContext(StoreContext)
  return (
    <div className='item-display'>
      <h2>Most Selling items of the year</h2>
      <div className='item-display-list'>
      {itemlist.map((item,index)=>{if(category==="All"||category===item.category){return(<div key={index} className='item'>
        <Link to={`/add-photo/${item.name}`} state={item}>
        <img src={item.image} alt={item.name} />
        <p className='name'>{item.name}</p>
        <p className='description'>{item.description}</p>
        <button>Buy</button>
        <p className="price">Rs {item.price}</p>
        </Link>
      </div>
      )}})}
      </div>
      </div>
  )
}

export default Itemdisplay
