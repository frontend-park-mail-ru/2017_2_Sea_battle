"use strict";

import BaseView from "../BaseView/BaseView.js";
<<<<<<< HEAD
=======
let generateStartGameMenuView = require("./StartGameMenuView.pug");
>>>>>>> 603d04f86a1a6818d43151c9e44048c2a64744ac

const startGameMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Start Game",
        menus:
            [
<<<<<<< HEAD
                {name: "Quick play", id: "/startGame/multiplayer"},
=======
>>>>>>> 603d04f86a1a6818d43151c9e44048c2a64744ac
                {name: "Log-in", id: "/startGame/login"},
                {name: "Register", id: "/startGame/register"},
            ]
    });

export default startGameMenuView;
