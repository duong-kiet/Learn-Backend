import bookRoute from "./book.route";
import userRoute from "./user.route";
import express from "express";

import { authenticate } from "../middlewares/auth.middleware";

export const routes = (app: express.Application) => {
  app.use("/book", authenticate, bookRoute);

  app.use("/user", userRoute);

  app.use("/", (req, res) => {
    res.send("Book Store API");
  });
};
