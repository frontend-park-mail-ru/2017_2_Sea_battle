"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateStartGameMenuView = require("../StartGameMenuView/StartGameMenuView.pug");

const gameModeMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Game Mode",
        menus:
            [
                {name: "Singleplayer", id: "/startGame/online"},
                {name: "Multiplayer", id: "/startGame/multiplayer"},
            ]
    });

export default gameModeMenuView;
