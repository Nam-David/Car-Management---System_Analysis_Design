// // this file is an entry of Backend server
const express = require('express');
const knex = require('knex');

const app = express();

//resolve CORS issue
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.listen(8989, (req, res) => {
  console.log('Server is running on port 9999');
})