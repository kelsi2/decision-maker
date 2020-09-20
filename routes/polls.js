const express = require('express');
const router = express.Router();

module.exports = function(database) {
  //create new poll
  router.get("/", (req, res) => {
    res.render('polls');
  });

  //submit new poll
  router.post('/', (req, res) => {
    res.redirect('polls');
  });
  return router;
};
