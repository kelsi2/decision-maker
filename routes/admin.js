const express = require("express");
const { getRankFromUser } = require("../database");
const router = express.Router();
const util = require("util");

module.exports = function (database) {
  router.get("/hello", (req, res) => {
    //use email input tag to send pollid to admin/hello
    console.log("query", req.query.email);
    database.getPollIdFromEmail(req.query.email).then((pollId) => {
      res.json(pollId);
      //console.log(pollId);
    });
  });

  // render graph for poll admin page
  router.get("/:pollId", (req, res) => {
    const pollId = req.params.pollId;

    database
      .getUsersThatVotedFromId(pollId)
      .then((users) => {
        //console.log(users);
        return Promise.all(
          users.map((name) => {
            return database
              .getRankFromUser(name.user_id, pollId)
              .then((ranks) => {
                //can rearrange object here
                // console.log("rank", ranks);
                return ranks;
              });
          })
        );
      })
      .then((ranksArray) => {
        //console.log('ranksArray', ranksArray)
        return database.getPoll(pollId).then((result) => {
          const promiseArray = result.map((option) => {
            return database.getTotalRank(option.id, pollId);
          });

          return Promise.all(promiseArray).then((object) => {
            const templateVars = {
              ranks: ranksArray,
              data: object,
              title: result[0].title,
              description: result[0].description,
              email: result[0].email,
            };
            console.log(
              util.inspect(templateVars, { showHidden: false, depth: 4 })
            );
            res.render("poll_admin", templateVars);
          });
        });
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  });

  router.get("/", (req, res) => {
    res.render("my_polls");
  });

  return router;
};
