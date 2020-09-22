require('dotenv').config();
const express = require('express');
const router = express.Router();
const mailgun = require('mailgun-js')({apiKey: process.env.API_KEY, domain: process.env.MGDOMAIN});


module.exports = function(database) {
  // Get data from Database.
  router.get("/:pollId", (req, res) => {
    database.getPoll(req.params.pollId)
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
    })
    .catch((err) => console.log(err.stack));
  });

  router.post("/email_check", (req, res) => {
    database.getUserIdWithEmail(req.body.email)
      .then((res) => {
        if (res === null) {
          database.createUser(req.body.email);
        }
      })
      .catch((err) => console.log(err.stack));
  });

  // What purpose does this route serve?
  router.post("/:pollId", (req, res) => {
    const options = req.body.options;
    const name = req.body.username;
    options.forEach((option, index) => {
      const rank = options.length-index;
      database.getOptionIdFromData(option,req.params.pollId)
      .then((id) =>  {
        database.createVote(name,id,rank)
      })
      .catch((err) => console.log(err.stack));
    });
    database.getEmailFromPollId(req.params.pollId)
    .then (emailObj => {
      const data = {
        from: 'Best Devs Ever <bestdevs@bestdevs.com>',
        to: emailObj.email,
        subject: `A new submission has been made on poll ${emailObj.id}!`,
        text: `Hi! \n
        Your poll has a new submission! \n
        You can revist your poll from the following link: \n
        localhost:5000/admin/${emailObj.id} \n\n
        Thanks once again for using the best decision maker ever created!`
      };
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
    })
    .catch((err) => console.log(err.stack));
    res.render('vote_confirm');
  });




  return router;
};
