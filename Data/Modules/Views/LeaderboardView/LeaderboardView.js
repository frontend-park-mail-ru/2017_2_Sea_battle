"use strict";

import BaseView from "../BaseView/BaseView.js";

const leaderboard = new BaseView(document.body, generateLeaderboardView, {title: "Leaderboard", players: []});

export default leaderboard;
