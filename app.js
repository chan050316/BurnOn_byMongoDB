// ENV
require("dotenv").config();
// DEPENDENCIES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect Database Success!");
  })
  .catch(err => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", indexRouter);
app.use(methodOverride("_method"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(PORT + "에서 대기중");
});
