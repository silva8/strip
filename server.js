const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes/api/index");

const app = express();

//Bodyparser middleware
//Parse application/x-www-form-urlencoded
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
//Parse application/json
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose.connect(db, { 
		useNewUrlParser: true,
  		useUnifiedTopology: true 
  		})
		.then(() => console.log("MongoDB successfully connected"))
  		.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//API routes
app.use("/", routes);

const port = 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));