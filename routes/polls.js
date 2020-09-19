const express = require('express');
const router = express.Router();
const generateRandomString = require('../helperFunctions');

//Create new poll
router.post('/', (req, res) => {
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

});
