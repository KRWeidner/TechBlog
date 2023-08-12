const withAuth = (req, res, next) => {
  // middleware to redirect the user to the login page if they are not logged in.
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
