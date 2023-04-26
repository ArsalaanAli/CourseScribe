const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", upload.single("userVideo"), (req, res) => {
  const file = req.file;
  const description = req.body.description;
  console.log(file.size);
  res.send("Received Data");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
