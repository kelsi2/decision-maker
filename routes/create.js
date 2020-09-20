<<<<<<< HEAD

module.exports = function(router, database) {
=======
const express = require('express');
const router = express.Router();

module.exports = function(database) {
>>>>>>> master

  router.get("/", (req, res) => {
    res.render('links');
  });

  //submit new poll
  router.post('/', (req, res) => {
<<<<<<< HEAD

    console.log(database.getUserWithEmail(req.body.user_email))
    res.redirect('links');
  });

=======
    console.log(req.body)
    const options = req.body.options
    database.getUserIdWithEmail(req.body.user_email)
    .then( userId => {
      const poll = {
        user_id: userId,
        poll_title: req.body.poll_title,
        poll_question: req.body.poll_question
      };
      database.createNewPoll(poll)
      .then(pollId =>{
        options.forEach((option) => {
        database.addOption({poll_id: pollId, data: option})
          .then( () => {res.redirect('links')})
          .catch ((err) => console.log("POST: ", err.stack));
        });
      })
    });
  })
>>>>>>> master
  return router;
}
