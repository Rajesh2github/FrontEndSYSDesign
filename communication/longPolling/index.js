import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 3000;
app.use(bodyParser.json());

let data = "Inprocess";
const waitingRequests = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
  if (data != req.query.status){
    waitingRequests.push(res);
  }else{
    res.json({ data });
  }

});

app.get('/updateDate', (req, res) => {
  data = req.query.status;
  if (waitingRequests.length > 0) {
    waitingRequests.forEach((response) => {
      response.json({ data });
    });
    waitingRequests.length = 0; // Clear the array after responding
  }
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});