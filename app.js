const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const { Pool } = require('pg');
require('dotenv').config();
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
