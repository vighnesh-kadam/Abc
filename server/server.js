// Loads the configuration from config.env to process.env
require("dotenv").config({ path: "./config.env" });
const route=require('./routes/record')
const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
// get MongoDB driver connection
const dbo = require("./db/conn");

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors({ credentials: true, origin: ['http://localhost:3001', 'https://railwaygrievances.netlify.app'] }));


app.use((req, res, next) => {

  

  res.header('Access-Control-Allow-Origin', 'https://railwaygrievances.netlify.app');

  //  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');


  // res.setHeader('Access-Control-Allow-Origin', 'https://railwaygrievances.netlify.app');
  // res.append('Access-Control-Allow-Origin', 'http://localhost:3001');


  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // console.log("Current user ",res.locals.user)
  next();
});


app.use(express.json());
app.use(jsonParser,require("./routes/record"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
