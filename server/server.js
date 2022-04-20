import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";

const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

// Create Express App
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("This is my own middleware");
  next();
});
app.use(cookieParser());

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
