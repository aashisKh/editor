const session = require('express-session');


const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 3600000, // Session expiration time (in milliseconds)
    }
  })


  const wrap = (expressMiddleware) => 
  (socket , next) => expressMiddleware(socket.request , {} , next)

  module.exports = {sessionMiddleware , wrap}