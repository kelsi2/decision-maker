const bodyParser = require('body-parser');
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
      if (res.rows.length > 0) {
        return res.rows[0].id;
      } else {
        return null;
      }
    })
    .catch((err) => console.log("query ID error", err.stack));
};

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
    .then((res) => {
      return res.rows[0].id;
    })
    .catch((err) => console.log("query CREATE error", err.stack));
};

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
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("query ADD error", err.stack));
};

exports.addOption = addOption;

const addUser = function(email) {
  return db.query(`
  INSERT INTO users (email)
  VALUES ($1)
  RETURNING *;
  `, [email])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("query ADD error", err.stack));
};

exports.addUser = addUser;

const getPolls = function(pollId) {
  return db.query(`
  SELECT options.id, options.data, polls.title, polls.description
  FROM options
  JOIN polls ON polls.id = poll_id
  WHERE poll_id = $1
  `, [pollId])
    .then(res => res.rows);
};

exports.getPolls = getPolls;

const getEmailFromPollId = function(pollId) {
  return db.query(`
  SELECT email, polls.id
  FROM users
  JOIN polls ON polls.creator_id = users.id
  WHERE polls.id = $1`, [pollId])
  .then(res => res.rows[0]);
};

exports.getEmailFromPollId = getEmailFromPollId;

const getOptionIdFromData = function(option, poll_id) {
  return db.query(`
  SELECT options.id
  FROM options
  WHERE data LIKE $1
  AND poll_id = $2`, [option,poll_id])
  .then((res) => {
    return res.rows[0].id
  })
  .catch((err) => console.log("query error", err.stack))
}

exports.getOptionIdFromData = getOptionIdFromData;

const addVotes = function(user_id, option_id, rank) {
  return db.query(`
  INSERT INTO votes (user_id, option_id, rank)
  VALUES ($1, $2, $3);`, [user_id, option_id, rank])
  .then((res) => {
    return res.rows;
  })
  .catch((err) => console.log("query ADD error", err.stack));
}

exports.addVotes = addVotes;

const getTotalRank = function(option_id) {
  return db.query(`
  SELECT SUM(rank)
  FROM votes
  WHERE option_id = $1
  GROUP BY option_id`, [option_id])
  .then((res) => {
    return res.rows[0]
  })
  .catch((err) => console.log("query error", err.stack));
}

exports.getTotalRank = getTotalRank;

const getEmailFromOptionsData = function(option_data, poll_id) {
  return db.query(`
  SELECT email, polls.id
  FROM users
  JOIN polls ON users.id = creator_id
  JOIN options ON polls.id = poll_id
  WHERE options.data LIKE $1
  AND poll_id = $2`, [option_data, poll_id])
  .then((res) => {
    return res.rows[0]
  })
  .catch((err) => console.log("query error", err.stack));
}

exports.getEmailFromOptionsData = getEmailFromOptionsData;
