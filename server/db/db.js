var pg = require('pg');

//Import private database config information

var dbConfig = require('../config/dbConfig.js');

//This section contains the settings to set up Postgres client pooling.
var config = {
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: 5432,
  database: dbConfig.dbName,
  max: 50, //max clients in the pool
  idleTimeoutMillis: 30000 //how long a client can be idle before being closed
};

//deploy
// var config = {
//   user: process.env.dbUsername,
//   password: process.env.dbPassword,
//   host: process.env.dbHost,
//   port: 5432,
//   database: process.env.dbName,
//   max: 50, //max clients in the pool
//   idleTimeoutMillis: 30000 //how long a client can be idle before being closed
// };


//create a postgres connection pool
var pool = new pg.Pool(config);
module.exports = pool;


