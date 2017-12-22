"use strict";
import BaseView from "../BaseView/BaseView.js";
let generateMainMenuView = require("./MainMenuView.pug");

const mainMenu = new BaseView(document.body, generateMainMenuView,
    {
        title: "Sea Battle",
        menus:
            [
                {name: "Start Game", id: "/startGame"},
                {name: "Leaderboard", id: "/leaderboardMenu"},
                {name: "About", id: "/aboutMenu"},
            ]
    });

export default mainMenu;
