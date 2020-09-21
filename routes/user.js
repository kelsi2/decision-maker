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
    const templateLiteral = {dummy}
    res.render("vote", templateLiteral);
  })

  router.post("/vote_confirm", (req,res) => {
    // BIG FANCY DB QUERY GOES HERE
    res.render("vote_confirm");
  })

  router.get("/vote_confirm", (req,res) => {
    alert('Page reached')
    res.render("vote_confirm");
  })


return router;
}
