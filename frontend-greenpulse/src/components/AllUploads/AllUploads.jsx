import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./AllUploads.module.css";
import { StoreContext } from "../../context/StoreContext";
const AllUploads = ({ setUploadFile,setUploadDone }) => {
  const {imageFiles,setImageFiles}=useContext(StoreContext)  
  const [images, setImages] = useState([]);
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file), 
      })
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (imagePreview) => {
    setImages((prevImages) => {
      prevImages.forEach((img) => {
        if (img.preview === imagePreview) {
          URL.revokeObjectURL(img.preview);
        }
      });
      return prevImages.filter((image) => image.preview !== imagePreview); 
    });
  };
  const handleDone = () => {
    console.log("Uploaded Images:", images);
    setUploadFile(false); 
    setUploadDone(true);
    imageFiles.current=images
  };

  return (
    <div className={styles.AllUploads}>
      <div className={styles.container}>
        <p className={styles.closeButton} onClick={() => setUploadFile(false)}>
          ❌
        </p>
        <h2>Upload Your Images</h2>
            <div className={styles.previewContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.preview}>
              <img src={image.preview} alt={`Uploaded ${index}`} />
              <span
                className={styles.removeButton}
                onClick={() => handleRemoveImage(image.preview)}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
        <div className={styles.uploadActions}>
          <label htmlFor="fileInput" className={styles.uploadMore}>
            {images.length===0?"Upload":"Upload more"}
          </label>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button onClick={handleDone} className={styles.doneButton}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUploads;
