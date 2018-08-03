const express = require('express');
const cors = require('cors');
const mysql = require('promise-mysql');


const bodyParser = require('body-parser');
const morgan = require('morgan');

// Data loader
const StepsDataLoader = require('./lib/stepsAPI.js');

// Controllers
const stepsController = require('./controllers/steps.js');

// const connection = require('knex')({
//     client: 'mysql',
//     connection: {
//     host     : 'localhost',
//     user     : 'root', 
//     password : 'root',
//     database: 'Writing/Steps'
//     }
//   });

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Steps'
  });


const dataLoader = new StepsDataLoader(connection);

// Express initialization
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/steps', stepsController(dataLoader));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (process.env.PORT) {
    console.log(`Web server is listening on https://${process.env.PORT}`);
  } else {
    console.log(`Web server is listening on http://localhost:${port}`);
  }
});