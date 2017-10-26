const express = require("express");
const path = require("path");
const body = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser');
const uuid = require('uuid/v4');

const app = express();
const DATA = path.resolve("./Data/"); // Where to get files from?
const port = process.env.PORT || 8080;

app.use(express.static(DATA));
app.use(body.json());
app.use(cookie());

const ids = {};
const users = {
    "aa@mail.ru": {name: "Alex", password: "a3", score: 0},
    "aaazzzx@mail.ru": {name: "YAX", password: "pas", score: 42}
};
const aboutText = {text: ["Sea battle game", "Made for TP sem-2"]};

app.post("/login", function(req, res)
{
    let password = req.body.password;
    let mail = req.body.mail;

    if(!password || !mail || !isValidMail(mail))
        return res.status(400).json({error: "Invalid data!"});

    if(!users[mail] || users[mail].password != password)
        return res.status(400).json({error: "Mail/password pair is not found"});

    const id = uuid();
    ids[id] = mail;

    res.status(201);
    res.cookie("Special seal", id, {expires: new Date(Date.now() + 1000*60*15)});
    res.json({id: id});
});

app.post("/register", function (req, res)
{
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;

    if (!password || !mail || !name || !isValidMail(mail))
        return res.status(400).json({error: 'Invalid data!'});
    if (users[name])
        return res.status(400).json({error: 'Mail is already used!'});

    const id = uuid();
    const user = {name: name, password: password, score: 0};
    ids[id] = mail;
    users[mail] = user;


    res.status(201)
    res.cookie("Special seal", id, {expires: new Date(Date.now() + 1000 * 60 * 15)});
    res.json({id: id});
});

app.get("/leaderboard", function (req, res)
{
    const scorelist = Object.values(users).sort((x, y) => y.score - x.score).map(
        user => {return {mail: user.mail, name: user.name, score: user.score}});

    res.status(201);
    res.json(scorelist);
});

app.get("/user", function (req, res)
{
    const id = req.cookies["Special seal"];
    const mail = ids[id];
    if (!mail || !users[mail])
        return res.status(401).end();

    res.status(201);
    res.json(users[mail]);
});

app.get("/about", function(req, res)
{
   res.status(201);
   res.json(aboutText);
});

app.get("/myName", function(req, res)
{
    let id = req.cookies["Special seal"];
    if(req.cookies === undefined || !ids[id])
        res.status(400).json({error: "Player not found!"});
    else
        res.status(201).json({name: users[ids[id]].name});
});

app.get("/", function(req, res)
{
    let indexFile = DATA + "index.html";
    res.sendFile(indexFile);
});

app.listen(port);

console.log("Here we go!");


function isValidMail(text)
{
    let reg = /[0-9A-Za-z\-\_]+@[A-Za-z\-\_]+\.[A-Za-z\-\_]+/; // RegExp for mail
    let match = text.match(reg);

    if(match != null && match[0] == text)
        return true;

    return false;
}
