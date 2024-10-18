const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

function middleware(req, res, next) {
  const token = req.header("token");
  if (token !== "test-token") {
    return res.send("Unauthorized request");
  }
  next();
}

app.use(middleware);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/sum", (req, res) => {
  const body = req.body;
  const { input1, input2 } = body;
  if (typeof input1 !== "number" || typeof input2 !== "number") {
    return res.send("Invalid input type ");
  }

  return res.json(input1 + input2);
});

app.listen(6000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server listening on port", 6000);
  }
});
