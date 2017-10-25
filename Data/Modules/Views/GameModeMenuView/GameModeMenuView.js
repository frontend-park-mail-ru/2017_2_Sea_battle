"use strict";

import BaseView from "../BaseView/BaseView.js";

const gameModeMenuView = new BaseView(document.body, generateStartGameMenuView,
    {
        title: "Game Mode",
        menus:
            [
                {name: "Stand-alone", id: "/start/singleplayer"},
                {name: "Multiplayer", id: "/start/multiplayer"},
            ]
    });

export default gameModeMenuView;
