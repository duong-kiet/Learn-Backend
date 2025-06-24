const bookRoute = require("./book.route.js");
const userRoute = require("./user.route.js");

const { authenticate } = require("../middlewares/auth.middleware.js");

module.exports.index = (app) => {
  app.use("/book", authenticate, bookRoute);

  app.use("/user", userRoute);

  app.use("/", (req, res) => {
    res.send("Book Store API");
  });
};
