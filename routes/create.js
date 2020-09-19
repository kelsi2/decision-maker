const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render('links');
});

//submit new poll
router.post('/', (req, res) => {
  console.log(req.body);
  res.redirect('links');
});

module.exports = router;
