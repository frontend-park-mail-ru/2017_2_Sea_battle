const fs = require("fs");
const pug = require("pug");
const path = require("path");
const DATA = path.resolve("./Data/");

console.log("Baking...");

// Leaderboard
const LEADERBOARD = DATA + "/Modules/Menus/Leaderboard/";
let leaderboardFunc = pug.compileFileClient(LEADERBOARD + "Leaderboard.pug", {name: "leaderboardTemplate"});
fs.writeFileSync(LEADERBOARD + "LeaderboardTemplate.js", leaderboardFunc);

// About
const ABOUT = DATA + "/Modules/Menus/About/";
let aboutFunc = pug.compileFileClient(ABOUT
    + "About.pug", {name: "aboutTemplate"});
fs.writeFileSync(ABOUT + "AboutTemplate.js", aboutFunc);

console.log("Baked!");
