module.exports = function(router, database) {

router.get("/", (req, res) => {
  let email = req.session.user_email;
  let logged = getUserByEmail(email);
  alert(logged);
  res.render('links');
});

//submit new poll
router.post('/', (req, res) => {
  req.session.user_email = req.body.user_email;
  res.redirect('links');
});

module.exports = router;

  return router;
}
