const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./router");
const server = express();
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const csurf = require('csurf')
const store = new KnexSessionStore(/* options here */);
require("dotenv").config();
const port = process.env.PORT || 2020;
server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  session({
    name: "KidsFly", // default is connect.sid
    secret: process.env.SESSSION_SECRET || "Okwa esi i ma hacking",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
server.use(csurf({cookie:false}))

server.use(function crsfProtection(err, req,res,next){
  if(err.code!=='EBADCSRFTOKEN'){
    return res.status(403).json('Form tampered')
  }
  next()
})


server.use("/api", router);


server.listen(port, () => {
  console.log(`\n=== Server listening into the future at ${port}\n`);
});
