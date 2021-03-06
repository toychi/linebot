"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const line = require("@line/bot-sdk");
const app = express();

app.set("port", process.env.PORT || 5000);
// Process application/json
app.use(bodyParser.json());

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const message = {
  type: "text",
  text: "Hello World!"
};

app.post("/webhook", (req, res) => {
  var text = req.body.events[0].message.text;
  var sender = req.body.events[0].source.userId;
  var replyToken = req.body.events[0].replyToken;
  console.log(text, sender, replyToken);
  console.log(typeof sender, typeof text);
  client
    .replyMessage(replyToken, message)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      // error handling
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

// Spin up the server
app.listen(app.get("port"), function() {
  console.log("running on port", app.get("port"));
});
