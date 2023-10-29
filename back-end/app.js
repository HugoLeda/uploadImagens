const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
  next();
});

const imagesList = ['teste1', 'teste2', 'teste3'];
const images = [];

app.post('/upload-image', async (req, res) => {
  if (req.file && imagesList.includes(req.file.originalname)) {
    images.push(req.file.originalname);
    const index = imagesList.indexOf(req.file.originalname);
    if (index !== -1) {
      imagesList.splice(index, 1);
    }

    console.log(imagesList, images)
    return res.status(200).json({
      mensagem: 'Imagem gravada no banco de dados!',
    });
  } else {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!',
    });
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});