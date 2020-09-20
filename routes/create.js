
const express = require('express');
const router = express.Router();
const getUserByEmail = require('./db_queries');

router.get("/", (req, res) => {
  let email = req.session.user_email;
  let logged = getUserByEmail(email);
  console.log(logged);
  res.render('links');
});

//submit new poll
router.post('/', (req, res) => {
  req.session.user_email = req.body.user_email;
  res.redirect('links');
});

module.exports = router;

