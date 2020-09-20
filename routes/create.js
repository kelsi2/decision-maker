const express = require('express');
const router = express.Router();

module.exports = function(database) {

  router.get("/:pollId", (req, res) => {
    res.render('links');
  });

  //submit new poll
  router.post('/', (req, res) => {
    const options = req.body.options
    database.getUserIdWithEmail(req.body.user_email)
    .then( userId => {
      const poll = {
        user_id: userId,
        poll_title: req.body.poll_title,
        poll_question: req.body.poll_question
      };
      return database.createNewPoll(poll)
    })
    .then(pollId =>{
      const promiseArray = [];
      promiseArray.push(pollId);
      promiseArray.push = options.map((option) => {
        return database.addOption({poll_id: pollId, data: option})
      });
      return Promise.all(promiseArray)
    })
    .then((result) => {
      res.redirect(`/links/${result}`);
    })
    .catch ((err) => console.log("POST: ", err.stack));
  })
  return router;
}

