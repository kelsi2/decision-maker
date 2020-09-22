const express = require('express');
const router = express.Router();

module.exports = function(database) {
  router.get("/:pollId", (req, res) => {
    const pollId = req.params.pollId;
    database.getPolls(pollId)
      .then((result) => {
        const promiseArray = result.map(option => {
          return database.getTotalRank(option.id, pollId);
        });
        return Promise.all(promiseArray)
          .then((object) => {
            console.log('object', object);
            console.log('result', result);

            const templateVars = {
              data: object,
              title: result[0].title,
              description: result[0].description,
              email: 'a@a.com'
            };
            res.render("poll_admin", templateVars);
          })
          .catch((err) => console.log(err));
      });
  });

  return router;
};
