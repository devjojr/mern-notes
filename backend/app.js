require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();

// connect to database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authenticateUser, noteRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
