const express = require('express');
const router = express.Router();

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
    const options = req.body.options;
    const name = req.body.username;
    options.forEach((option, index) => {
      const rank = options.length-index;
      database.getOptionIdFromData(option,req.params.pollId)
      .then((id) =>  {
        database.addVotes(name,id,rank)
      });
    });
    res.render('vote_confirm');
  });




  return router;
};
