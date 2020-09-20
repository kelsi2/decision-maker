const db = require('./db');

const getUserWithEmail = function(email) {
  return db.query(`
  SELECT * FROM users
  WHERE email LIKE $1
  `, [email])
    .then((res) => {
      if (res) {
        console.log(res.rows[0]);
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => console.log("query error", err.stack));
};

exports.getUserWithEmail = getUserWithEmail;
