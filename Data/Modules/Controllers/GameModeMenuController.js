"use strict";

import MainMenuController from "./MainMenuController.js";

class GameModeMenuController extends MainMenuController
{
    constructor(view)
    {
        super(view);

        this.title = "Game Mode";
        this.url = "/selectMode";
    }
}

export default GameModeMenuController;
