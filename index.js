const express = require("express");
const path = require("path");
const body = require('body-parser');

const app = express();

const DATA = path.resolve("./Data/"); // Where to get files from?
const port = process.env.PORT || 8080;
app.use(express.static(DATA));
app.use(body.json());


function sendIndex(req, res)
{
    let indexFile = DATA + "/" + "index.html";
    res.sendFile(indexFile);
}

// Routing paths
app.get("/", sendIndex);
app.get("/leaderboardMenu", sendIndex);
app.get("/aboutMenu", sendIndex);
app.get("/startGame", sendIndex);
app.get("/selectMode", sendIndex);
app.get("/startGame/login", sendIndex);
app.get("/startGame/register", sendIndex);
app.get("/selectMode", sendIndex);
app.get("/startGame/offline", sendIndex);
app.get("/startGame/online", sendIndex);
app.get("/startGame/multiplayer", sendIndex);



app.listen(port);

console.log("Here we go!");
