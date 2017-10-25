"use strict";

import BaseView from "../BaseView/BaseView.js";

const startGameMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Start Game",
        menus:
            [
                {name: "Log-in", id: "/start/login"},
                {name: "Register", id: "/start/register"},
            ]
    });

export default startGameMenuView;
