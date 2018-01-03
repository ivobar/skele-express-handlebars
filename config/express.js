const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const path = require('path')

module.exports = (app, config) => {
  app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  }))

  app.set('view engine', '.hbs');

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  //Middleware for access control
  app.use((req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.hasUserAccess = true;
    }
    if (req.user && req.user.hasAccess('Admin')) {
      res.locals.hasAdminAccess = true;
    }

    next();
  });

  //Middleware - attach user to locals
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user
    }
    next()
  })
  //Middleware - get the error message from the query.
  app.use((req, res, next) => {
    if (req.query.error) {
      res.locals.error = req.query.error;
    }
    next();
  })

  // app.set('views', path.join(config.rootPath, 'views'))

  // Configure "public" folder
  app.use(express.static('./public'))
}
