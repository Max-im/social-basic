const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const log = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");

// settings
const app = express();
app.use(log("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  require("dotenv").config({ path: "server/env/variables.env" });
  const cors = require("cors");
  app.use(cors());
}

// connect db
const dbOptions = { useNewUrlParser: true };
mongoose
  .connect(process.env.DB_URL, dbOptions)
  .then(() => console.log("db connected"))
  .catch(err => console.log(err.message));

// include routes
app.use("/", routes);

// error handler
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Authentication error");
  }
});

// launch server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server run"));
