console.clear();
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();

const { PORT } = process.env;

//Logger
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
