const db = require('../lib/database');

const getUserByEmail = (email) => {
  return db.query(`
  SELECT * FROM users
    WHERE email = $1;
    `, [email])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};


module.exports = getUserByEmail;
