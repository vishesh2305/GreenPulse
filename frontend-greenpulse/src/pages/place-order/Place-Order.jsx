import React, {useState } from 'react'
import "./place-order.css"
import { useLocation } from 'react-router-dom'
import ViewImages from '../../components/ViewImages/ViewImages'
const PlaceOrder = () => {
  const location = useLocation()
  const [viewImages,setviewImages]=useState(false)
  const files = location.state
  console.log(files)
  return (
    <>
    {viewImages? <ViewImages/> :""}
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <br />
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-center">
        <h3>
          Cart Total
        </h3>
        <br />
        <div className='order-details'>
          <div className='subtotal'>
            <p>Subtotal</p>
            <p>Rs {files.price}</p>
          </div>
          <hr />
          <div className='d-charges'>
            <p>Delievery</p>
            <p>Rs 0</p>
          </div>
          <hr />

          <div className='final-amount'>
            <p>Total</p>
            <p>Rs {files.price}</p>
          </div>
          <br />
          <button>Proceed to pay </button>
        </div>
      </div>
      <div className="place-order-right">
        <div className="item-details">
          <button className='view-images' onClick={(e)=>{e.preventDefault();setviewImages(true)}}>View Images</button>
          <img src={files.image} alt="" />
          <p>{files.name}</p>
        </div>

      </div>

    </form>
    </>
  )
}

export default PlaceOrder
