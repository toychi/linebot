"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const line = require("@line/bot-sdk");
const app = express();

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const message = {
  type: "text",
  text: "Hello World!"
};

app.set("port", process.env.PORT || 5000);

// Process application/json
app.use(bodyParser.json());

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

// Spin up the server
app.listen(app.get("port"), function() {
  console.log("running on port", app.get("port"));
});
