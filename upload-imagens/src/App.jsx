import React, {useState} from "react";
import './styles/app.css'

import firebase from "./config/firebase";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { BiImageAdd } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

function App() {  

  const [images, setImages] = useState([]);
  
  const storage = firebase.storage();

  const uploadImages = async () => { 
    if (images.length < 1) {
      toast.warn('Nenhuma imagem selecionada!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const storageRef = storage.ref();
      const promises = [];

      for(let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = storageRef.child(`images/${image.name}`);
        promises.push(imageRef.put(image));
      };
      
      Promise.all(promises)
        .then(() => {
          if (images.length > 1) {
            toast.success(`${images.length} imagens gravadas com sucesso!`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.success(`${images.length} imagem gravada com sucesso!`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          };
          
          setImages([])
        })
        .catch((error) => {
          toast.error(`Erro ao gravar: ${error}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          
        });
    };      
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

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className="drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}        
      >
        <a href="#"><BiImageAdd/></a>
        <label htmlFor="image">Selecione ou arraste aqui as suas fotos</label>
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
      
      <button className="upload" onClick={uploadImages}>Salvar</button> 
    </div>
  );
}

export default App;