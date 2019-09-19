const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const gravatar = require("gravatar");
const passport = require("passport");

const users = require("./router/api/users");
const profile = require("./router/api/profile");
const posts = require("./router/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

//routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
