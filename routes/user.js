const express = require('express');
const router = express.Router();

const dummy = {
  poll_title: 'This is dumb',
  poll_question: 'What is your quest?',
  option : [
    'dumb1', 'dumber2', 'reallydumb'
  ]
}

module.exports = function(database) {
  router.get("/:pollId", (req,res) => {
    console.log(req.params);
    database.getPolls(req.params.pollId)
    .then(polls => {
      const templateVars = {
        poll_title: polls[0].title,
        poll_question: polls[0].description,
        option: [polls[0].data, polls[1].data, polls[2].data]
      }
      res.render("vote", templateVars);
    })
    // const templateLiteral = {dummy}
    // res.render("vote", templateLiteral);
  })

  router.post("/:pollId", (req,res) => {
    //big fat query
    res.render('vote_confirm');
  })




return router;
}
