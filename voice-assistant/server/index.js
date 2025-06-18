const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/recipes', async (req, res) => {
  const snapshot = await db.collection('recipes').get();
  const recipes = snapshot.docs.map(doc => doc.data());
  res.send(recipes);
});

app.post('/transcribe', upload.single('audio'), async (req, res) => {
  const audioFile = req.file;
  const formData = new FormData();
  formData.append('file', fs.createReadStream(audioFile.path));
  formData.append('model', 'whisper-1');

  const result = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      ...formData.getHeaders()
    }
  });

  res.send({ transcript: result.data.text });
});

app.listen(3000, () => console.log('Server running on port 3000'));
