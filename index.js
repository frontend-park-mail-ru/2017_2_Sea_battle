const express = require("express");
const path = require("path");
const app = express();

const DATA = path.resolve("./Data/"); // Where to get files from?
const port = process.env.PORT || 8080;

app.use(express.static(DATA));

app.get('/', function(req, res)
{
    let indexFile = DATA + "index.html";
    res.sendFile(indexFile);
});

app.listen(port);

console.log("Here we go!");
