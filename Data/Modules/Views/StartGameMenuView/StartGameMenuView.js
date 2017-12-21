"use strict";

import BaseView from "../BaseView/BaseView.js";

const startGameMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Start Game",
        menus:
            [
                {name: "Quick play", id: "/startGame/multiplayer"},
                {name: "Log-in", id: "/startGame/login"},
                {name: "Register", id: "/startGame/register"},
            ]
    });

export default startGameMenuView;
