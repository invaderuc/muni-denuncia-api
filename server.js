const express = require("express");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app middleware express
const app = express();

// db
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
 
app.use(cors());
console.log(readdirSync("./routes"));

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8004;

app.listen(port, () => console.log(`Server is running on port ${port}`));