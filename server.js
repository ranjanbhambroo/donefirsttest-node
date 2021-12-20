const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./dbconfig');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3338;

app.use(bodyParser.json())
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'html')));
app.use(express.json());

  app.get('/users', db.getUsers);
  app.post('/users', db.createUser);
  app.post('/createAppointment', db.addUserAppointment);
  app.post('/upload', db.addUserIdentification);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});