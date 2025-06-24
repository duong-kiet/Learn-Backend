import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { routes } from "./routes/index.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Dùng khi gửi form
app.use(bodyParser.urlencoded({ extended: false }));

// Dùng khi gửi body
app.use(bodyParser.json());

routes(app);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
