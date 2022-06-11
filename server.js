const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
var { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = require(("./graphql/schema"));
// app middleware express
const app = express();

// db
connectDB();

// middlewares
app.use(express.json({ limit: "2mb" }));
 
app.use(cors());
console.log(readdirSync("./routes"));

app.use('/graphql', graphqlHTTP({
	schema: schema,
	//rootValue: root,
	graphiql: true
}));

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8004;

app.listen(port, () => console.log(`Server is running on port ${port}`));