import React, {useState} from "react";
import PreviewImages from "./components/previewImages";
import './styles/app.css'

import { BiImageAdd } from 'react-icons/bi';

function App() {
  const [images, setImages] = useState([]);

  const uploadImages = () => {

  };  

  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy"; // Define o cursor durante a operação de arrastar
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles(files);
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
          onChange={(e) => setImages(e.target.files)}
          accept=".jpg, .jpeg, .png" 
        />
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
        accept=".jpg, .jpeg, .png" 
      />
      
      <button onClick={uploadImages}>Upload</button>         

      <ul>
        {droppedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>   
      
    </div>
  );
}



export default App;