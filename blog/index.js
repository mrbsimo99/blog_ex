require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const db = require("./db");

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", require("./auth")); // -> /auth
app.use("/api", require("./api")); // -> /api

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
    console.log(`Server up and running on http://localhost:${SERVER_PORT}`);

    db.connect();
});