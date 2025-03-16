import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import styles from "./AddPhoto.module.css"
import AllUploads from '../../components/AllUploads/AllUploads';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
const AddPhoto = () => {
  const navigate=useNavigate()
  const {addToCart,cartItems,imageFiles}=useContext(StoreContext)
  const [uploadDone,setUploadDone]=useState(false)
  const location=useLocation();
  const item=location.state;
  const [uploadFile,setUploadFile]=useState(false);

  return (

    <div className={styles.add_photo_section}>
      <h2>Upload your photo</h2>
      <hr />
      <div className={styles.add_photo_container}>
        <div className={styles.item_container}>
      <img src={item.image} alt="" />
      <h2>{item.name} </h2>
      </div>
      <div className={styles.item_d2}>
      <h3>Size: {item.size}</h3>
      <p className={styles.item_detail}>{item.fulldetail}</p>
      </div>
      <form action="" method="POST">
        <div className={styles.img_combine}>
  <label htmlFor='imageUpload'  className={styles.imageUpload}> <i className="fas fa-upload"></i></label>
  <p className={styles.uploadtxt}>{!uploadDone?"Upload image here":"Images Upload Successful"}</p>
  </div>
  <input  multiple type="file" id="imageUpload" name="image" accept="image/*"onClick={(e)=>{e.preventDefault();setUploadFile(true)}}/>
  {uploadFile?<AllUploads setUploadFile={setUploadFile} setUploadDone={setUploadDone}/>:""}
  <p className={styles.price}>Rs {item.price}</p>
  <div className={styles.final_buy}>
  <Link to="/order" state={item}><button className={styles.buy}
  > Buy Now</button></Link>
  <button onClick={
    (e)=>{e.preventDefault()
      addToCart(item._id);

    }

  } className={styles.cart}>Add to Cart</button>
  <p id='warn'></p>
    </div>
</form>
</div>
<hr />
    </div>
  )
}

export default AddPhoto
