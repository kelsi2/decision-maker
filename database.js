const db = require('./db');

/**
 * Get a single user id from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user id.
 */
const getUserIdWithEmail = function(email) {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email])
  .then((res) => {
    if (res) {
      return res.rows[0].id;
    } else {
      return null;
    }
   })
   .catch ((err) => console.log("query ID error", err.stack));
}

exports.getUserIdWithEmail = getUserIdWithEmail;

/**
 * Create a new entry in the polls database.
 * @param {Object} poll The poll object containing all required data.
 * @return {Promise<{}>} A promise to the poll id.
 */
const createNewPoll = function(poll) {
  return db.query(`
  INSERT INTO polls(creator_id, title, description)
  VALUES ($1, $2, $3)
  RETURNING id;
  `, [poll.user_id, poll.poll_title, poll.poll_question])
  .then((res) =>{
  return res.rows[0].id
  })
  .catch ((err) => console.log("query CREATE error", err.stack));
}

exports.createNewPoll = createNewPoll;

/**
 * Create a new entry in the options database for a given poll id.
 * @param {Object} option The option object containing poll id and option data.
 * @return {Promise<{}>} A promise to the option.
 */
const addOption = function(option) {
  return db.query(`
  INSERT INTO options(poll_id, data)
  VALUES ($1, $2)
  RETURNING *;
  `, [option.poll_id, option.data])
  .then((res) =>{
  return res.rows
  })
  .catch ((err) => console.log("query ADD error", err.stack));
}

exports.addOption = addOption;
