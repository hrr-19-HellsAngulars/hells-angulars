var pg = require('pg');

//Import private database config information
var dbConfig = require('../config/dbConfig.js');
// Uncomment the line below if you want to test on your local DB instead of cloud.
//dbConfig.url = 'postgres://localhost:5432/hells'

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
// var connection = 'postgres://localhost:5432/hells';
// var client = new pg.Client(connection);
// client.connect();

//create a postgres connection pool
var pool = new pg.Pool(config);
module.exports = pool;

//----------------------
//Below is the schema implementation.
//When db.js is run, this section runs the schema query, which creates any tables that don't exist. If the table already exists, it does not overwrite the existing data.
//I don't see this permanently living here, but it's OK for now.
var schema = require('./schema');
pool.query(schema, function(err, result) {
  if (err) return console.log(err);
  console.log(result);
});

// var query = client.query(schema);
// query.on('end', function () {
//   client.end();
// })


