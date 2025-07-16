import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 3000;
app.use(bodyParser.json());

let counter = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/poll', (req, res) => {
res.json({ counter });
});

app.get('/increment', (req, res) => {
  counter++;
  res.json({ counter });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});