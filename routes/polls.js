require('dotenv').config();
const express = require('express');
const router = express.Router();
const mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: process.env.MGDOMAIN});

module.exports = function(database) {

  //create new poll
  router.get("/", (req, res) => {
    res.render('polls');
  });

  // render links page with admin/user poll links
  router.get("/:pollId/links", (req, res) => {
    let id = req.params.pollId;
    res.render('links', {id});
  });

  //submit new poll
  router.post('/', (req, res) => {
    const options = req.body.options;
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
      promiseArray.push = options.map((option) => {database.createOption({poll_id: pollId, data: option})});
      return Promise.all(promiseArray)
    })
    .then((result) => {
      const pollId = result[0];
      return database.getEmailFromPollId(pollId)
    })
    .then(emailObj=> {
      const data = {
        from: 'Best Devs Ever <bestdevs@bestdevs.com>',
        to: emailObj.email,
        subject: `A new poll ${emailObj.id} has been created!`,
        text: `Hi! \n
        Here's your administrative link: localhost:5000/admin/${emailObj.id} \n
        Here's the link to send to your voters: localhost:5000/user/${emailObj.id} \n\n
        Thanks for using the best decision maker ever created!`
      };
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
      res.redirect(`/polls/${emailObj.id}/links`);
      })
    .catch ((err) => console.log("POST: ", err.stack));
  });
  return router;
};

