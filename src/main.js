const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

// Dùng khi gửi form
app.use(bodyParser.urlencoded({ extended: false }));

// Dùng khi gửi body
app.use(bodyParser.json());

const route = require("./routes/index.route.js");

route.index(app);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
