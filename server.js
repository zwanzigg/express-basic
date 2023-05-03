require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const hostname = "localhost";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");

mongoose.connect( process.env.DB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", usersRouter);

app.listen(port, () =>
  console.log(`Server is listening at http://${hostname}:${port}`)
);
