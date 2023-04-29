const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const { PythonShell } = require('python-shell');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Chatbot API Server');
});
async function consumeAPI(prompt) {
  
  try {
    const response = await axios.get('http://127.0.0.1:5000/predict', { params: { prompt: prompt } });
    return response.data
  } catch (error) {
      console.error(`Error al consumir la API: ${error.message}`);
  }
}

app.post('/respuesta', async (req, res) => {
  // Aquí es donde puedes procesar el mensaje entrante y generar una respuesta del chatbot.
  const { message } = req.body;
  
 
  
  let response = await consumeAPI(message);
  console.log(response)

  // Por ahora, solo devolveremos un mensaje de prueba y opciones.
  res.send({
    message: `Recibí tu mensaje: ${message}`,
    predict : response.predict ,
    acurracy : response.acurracy ,
    options: ['Opción 1', 'Opción 2', 'Opción 3'],
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
