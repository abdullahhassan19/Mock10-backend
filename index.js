const express = require("express");
require("dotenv").config();
const { connection } = require("./Config/db");
const cors = require("cors");
const { UserRouter } = require("./Routers/UserRouter");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;
app.use("/", UserRouter);
app.listen(PORT, async () => {
  await connection;
  try {
    console.log("Connected to db");
  } catch {
    console.log("error in db");
  }
  console.log(`running on port ${PORT}`);
});
