"use strict";

import MainMenuController from "./MainMenuController.js";

class StartGameMenuController extends MainMenuController
{
    constructor(view)
    {
        super(view);

        this.title = "Start Game";
        this.url = "/startGame";
    }
}

export default StartGameMenuController;
