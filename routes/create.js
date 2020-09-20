module.exports = function(router, database) {

  router.get("/", (req, res) => {
    res.render('links');
  });

  //submit new poll
  router.post('/', (req, res) => {
    database.getUserWithEmail(req.body.user_email);
    res.redirect('links');
  });

  return router;
}
