const app = require("express")();
const public = require("./routers/public");
const admin = require("./routers/admin");

app.use("/", public);
app.use("/admin", admin);

module.exports = app;
