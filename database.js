const bodyParser = require('body-parser');
const db = require('./db');

//-------------------------------------------------------------------
// CREATE QUERIES

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
    .then((res) => res.rows[0].id)
    .catch((err) => console.log("query error", err.stack));
};

exports.createNewPoll = createNewPoll;

/**
 * Create a new entry in the options database for a given poll.
 * @param {Object} option The option object containing poll id and option data.
 * @return {Promise<{}>} A promise to the option.
 */
const createOption = function(option) {
  return db.query(`
  INSERT INTO options(poll_id, data)
  VALUES ($1, $2)
  RETURNING *;
  `, [option.poll_id, option.data])
    .then((res) => res.rows)
    .catch((err) => console.log("query error", err.stack));
};

exports.createOption = createOption;

/**
 * Create a new entry in the user database.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const createUser = function(email) {
  return db.query(`
  INSERT INTO users (email)
  VALUES ($1)
  RETURNING *;
  `, [email])
    .then((res) => res.rows)
    .catch((err) => console.log("query error", err.stack));
};

exports.createUser = createUser;

/**
 * Create an entry in the votes database
 * @param {String} user_id The user_id of the voter
 * @param {String} option_id The option data the vote was cast for.
 * @param {String} rank The rank for the option.
 * @return {Promise<{}>} A promise to the vote.
 */
const createVote = function(user_id, option_id, rank) {
  return db.query(`
  INSERT INTO votes (user_id, option_id, rank)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user_id, option_id, rank])
    .then((res) => res.rows)
    .catch((err) => console.log("query error", err.stack));
};

exports.createVote = createVote;

//-------------------------------------------------------------------
// GET QUERIES

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
      if (res.rows.length > 0) {
        return res.rows[0].id;
      } else {
        return null;
      }
    })
    .catch((err) => console.log("query error", err.stack));
};

exports.getUserIdWithEmail = getUserIdWithEmail;

/**
 * Get a single entry in the polls database for a poll id
 * @param {String} pollId The poll id of the requested poll.
 * @return {Promise<{}>} A promise to the request poll data (options.id, options.data, polls.title, polls.description).
 */
const getPoll = function(pollId) {
  return db.query(`
  SELECT options.id, options.data, polls.title, polls.description, users.email
  FROM options
  JOIN polls ON polls.id = poll_id
  JOIN users ON users.id = creator_id
  WHERE poll_id = $1
  `, [pollId])
  .then(res => res.rows)
  .catch((err) => console.log("query error", err.stack));
};

exports.getPoll = getPoll;

/**
 * Get a single entry in the email database for a poll id
 * @param {String} pollId The poll id for a given poll.
 * @return {Promise<{}>} A promise to the email.
 */
const getEmailFromPollId = function(pollId) {
  return db.query(`
  SELECT email, polls.id
  FROM users
  JOIN polls ON polls.creator_id = users.id
  WHERE polls.id = $1`, [pollId])
  .then(res => res.rows[0])
  .catch((err) => console.log("query error", err.stack));
};

exports.getEmailFromPollId = getEmailFromPollId;

/**
 * Get a single entry in the options database for a poll id and option data
 * @param {String} poll_id The poll id for the requested option.
 * @param {String} option The option data for the id.
 * @return {Promise<{}>} A promise to the option id.
 */
const getOptionIdFromData = function(option, poll_id) {
  return db.query(`
  SELECT options.id
  FROM options
  WHERE data LIKE $1
  AND poll_id = $2`, [option, poll_id])
  .then((res) => res.rows[0].id)
  .catch((err) => console.log("query error", err.stack));
};

exports.getOptionIdFromData = getOptionIdFromData;


/**
 * Get the sum of the ranking for a specific option in a poll
 * @param {String} poll_id The poll id for the requested option id.
 * @param {String} option_id The option id for the requested rank.
 * @return {Promise<{}>} A promise to the sum of the ranking.
 */
const getTotalRank = function(option_id, poll_id) {
  return db.query(`
  SELECT SUM(rank), options.data
  FROM votes
  JOIN options ON options.id = option_id
  WHERE option_id = $1
  AND poll_id = $2
  GROUP BY option_id, options.data`, [option_id, poll_id])
  .then((res) => res.rows[0])
  .catch((err) => console.log("query error", err.stack));
};

exports.getTotalRank = getTotalRank;


