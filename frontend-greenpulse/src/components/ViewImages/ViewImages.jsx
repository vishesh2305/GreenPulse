import React, { useContext } from 'react'
import styles from "./ViewImages.module.css"
import { StoreContext } from '../../context/StoreContext'
const ViewImages = () => {
const { imageFiles } = useContext(StoreContext)
const images=imageFiles.current
console.log(imageFiles)
  return (
    <div className={styles.view_of_images}>
        {images.map((item,index)=><img key={index} src={item.preview}></img>)}
      
    </div>
  )
}

export default ViewImages
