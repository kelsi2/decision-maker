const mailgunConfig = require('./config');
const express = require('express');
const router = express.Router();
const mailgun = require('mailgun-js')({apiKey: mailgunConfig.api_key, domain: mailgunConfig.domain});

module.exports = function(database) {

  router.get("/:pollId", (req, res) => {
    let id = req.params.pollId;
    res.render('links', {id});
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
      // const data = {
      //   from: 'Best Devs Ever <bestdevs@bestdevs.com>',
      //   to: 'useremail@here',
      //   subject: 'Hello',
      //   text: 'Testing some Mailgun awesomness!'
      // };
      // mailgun.messages().send(data, function (error, body) {
      //   console.log(body);
      // });
      res.redirect(`/links/${result}`);
    })
    .catch ((err) => console.log("POST: ", err.stack));
  })
  return router;
}

