import React, { createContext, useState,useContext } from 'react'
import styles from "./cart.module.css"
import { StoreContext } from '../../context/StoreContext'
const Cart = () => {
  const {cartItems,itemlist,removeFromCart}=useContext(StoreContext)
  return (
    // <div>
    //   <div className={styles.cart}>
    //     <div className={styles.cart_items}>
    //       <div className={styles.cart_items_title}>
    //         <p>Items</p>
    //         <p>Title</p>
    //         <p>Price</p>
    //         <p>Quantity</p>
    //         <p>Total</p>
    //         <p>Remove</p>
    //       </div>
    //       <br />
    //       <hr />
    //       {
    //         itemlist.map((item,index)=>{
    //           if(cartItems[item._id]>0){
    //             return(
    //               <div className={styles.card_items_title} key={item._id}>
    //                 <p>{item.name}</p>
    //                 </div>
    //             )
    //           }

    //         })
    //       }
    //     </div>
    //   </div>
    // </div>
    <h1>Coming Soon</h1>
  )
}

export default Cart
