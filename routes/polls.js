const express = require('express');
const router = express.Router();
const generateRandomString = require('../lib/helperFunctions');

//Create new poll
// router.post('/', (req, res) => {
//generate link
// const adminID = generateRandomString();
// const voterID = generateRandomString();
// let options = [];

// const newPoll = {
//   email: req.body.email,
//   title: req.body.title,
//   adminURL: adminID,
//   voterURL: voterID,
//   voteCount: 0
// };
module.exports = function(router, database) {
  //create new poll
  router.get("/", (req, res) => {
    res.render('polls');
  });

  //submit new poll
  router.post('/', (req, res) => {
    res.redirect('polls');
  });
  return router;
}
