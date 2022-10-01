const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;

// ValidatorJS
const Validator = require("validatorjs");
Validator.useLang("id");

// MomentJS
const moment = require("moment");
moment.locale("id");

// body-parser
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// CORS
const cors = require("cors");
app.use(cors());

// Extended API Express
const decorate = require("./tools/index");
decorate(app);

const router = require("./router/router");
app.use("/", router);

app.use(function (req, res, next) {
  res.sendNotFound();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
