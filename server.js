const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconfig');
const cors = require('cors');
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  )

  app.get('/users', db.getUsers);
  app.post('/users', db.createUser);
  app.post('/createAppointment', db.addUserAppointment);
  app.post('/upload', db.addUserIdentification);

app.listen(port, () => {
  console.log(`Done is running on port ${port}.`);
});