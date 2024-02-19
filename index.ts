require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "./dist/web")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/web/", "index.html"));
});

//The port here is from the environment variables
app.listen(process.env.PORT, process.env.IP_ADDRESS);
