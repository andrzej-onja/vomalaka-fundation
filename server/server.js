const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const bookSchema = require("./graphql/BookSchema").BookSchema;
const adSchema = require("./graphql/AdSchema").AdSchema;

const cors = require("cors");

const gql = require("graphql-tag");
const Ad = require("./models/ad");
const BookModel = require("./models/book");

app.use(cors());
app.options("*", cors());

mongoose.connect(
  "mongodb://mongo/myappdb",
  { useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("connected to mo1223m");
  }
);

app.set("port", process.env.port || 4000);
app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"));
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: adSchema,
    rootValue: global,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello wood ! ");
});
