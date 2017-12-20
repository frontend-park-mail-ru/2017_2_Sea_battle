"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateStartGameMenuView = require("./StartGameMenuView.pug");

const startGameMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Start Game",
        menus:
            [
                {name: "Log-in", id: "/startGame/login"},
                {name: "Register", id: "/startGame/register"},
            ]
    });

export default startGameMenuView;
