const express = require('express');
const router = express.Router();

const dummy = {
  poll_title: 'This is dumb',
  poll_question: 'What is your quest?',
  option: [
    'dumb1', 'dumber2', 'reallydumb'
  ]
};

module.exports = function(database) {
  // Get data from Database.
  router.get("/:pollId", (req, res) => {
    database.getPolls(req.params.pollId)
      .then(polls => {
        let options = [];
        polls.forEach(poll => {
          options.push(poll.data);
        });
        const templateVars = {
          id: req.params.pollId,
          poll_title: polls[0].title,
          poll_question: polls[0].description,
          options: options
        };
        console.log(templateVars);
        res.render("vote", templateVars);
      });
    // const templateLiteral = {dummy}
    // res.render("vote", templateLiteral);
  });

  router.post("/email_check", (req, res) => {
    database.getUserIdWithEmail(req.body.email)
      .then((res) => {
        if (res === null) {
          database.addUser(req.body.email);
        }
      });
  });

  // What purpose does this route serve?
  router.post("/:pollId", (req, res) => {
    console.log(':pollId req.body', req.body);
    //big fat query
    res.render('vote_confirm');
  });




  return router;
};
