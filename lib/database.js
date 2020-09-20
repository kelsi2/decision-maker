const {Pool} = require('pg');
const dbParams = require('./db.js');
const db = new Pool(dbParams);
db.connect(() => {
  console.log('connected to server');
});


module.exports = db;
