const fs = require("fs");
const pug = require("pug");
const path = require("path");
const DATA = path.resolve("./Data/");

console.log("Baking...");

const LEADERBOARD = DATA + "/Modules/Menus/Leaderboard/";
var leaderboardFunc = pug.compileFileClient(LEADERBOARD + "Leaderboard.pug", {name: "leaderboardTemplate"});
fs.writeFileSync(LEADERBOARD + "LeaderboardTemplate.js", leaderboardFunc);

console.log("Baked!");
