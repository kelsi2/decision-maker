const {Client} = require('pg');

const dbParams = require('../lib/db.js');
const db = new Client(dbParams);
db.connect(() => {
  console.log("Connected to database");
});
module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback)
  },
}


