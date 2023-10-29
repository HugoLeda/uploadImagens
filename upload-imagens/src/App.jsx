import React, {useState} from "react";
import './styles/app.css'

import api from './config/configApi';

import { BiImageAdd } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

function App() {
  const [images, setImages] = useState([]);

  const uploadImages = () => {

  };    

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy"; // Define o cursor durante a operação de arrastar
  };

  const handleDrop = (e) => {
    e.preventDefault(); 
    const newFiles = Array.from(e.dataTransfer.files);
    const existingFiles = Array.from(images);          
    const combinedFiles = [...existingFiles, ...newFiles];

    setImages(combinedFiles);
  };

  const handleFileChange = (e) => {       
    const existingFiles = Array.from(images);      
    const newFiles = Array.from(e.target.files);    
    const combinedFiles = [...existingFiles, ...newFiles];

    setImages(combinedFiles);
  };
  
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="App">      
      
      <div
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}        
      >
        <a href="#"><BiImageAdd/></a>
        <label htmlFor="image">Selecione suas fotos</label>
        <input
          type="file"
          multiple
          id="image"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png" 
        />
      </div>                          

      <div className="selected-images">
        {images.map((file, index) => (
          <div className="item-selected-images">            
            <span key={index}>{file.name}</span>
            <a key={index} href="#" onClick={() => removeImage(index)}><AiOutlineDelete/></a>
          </div>
        ))}
      </div>   
      
      <button onClick={uploadImages}>Upload</button> 
    </div>
  );
}



export default App;