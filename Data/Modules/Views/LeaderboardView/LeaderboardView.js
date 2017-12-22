"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateLeaderboardView = require("./LeaderboardView.pug");

const leaderboard = new BaseView(document.body, generateLeaderboardView, {title: "Leaderboard", players: []});

export default leaderboard;
