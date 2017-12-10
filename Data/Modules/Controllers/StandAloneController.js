"use strict";

import startGame from "../../Game/StartGame.js";
import GameScene from "../../Game/GameScene.js";

const STAND_ALONE = 0;

class StandAloneController
{
    constructor()
    {
        this.url = "/startGame/offline";
    }

    show()
    {
        startGame(STAND_ALONE);
    }

    hide()
    {
        let gameScene = new GameScene();
        gameScene.hide();
    }

}

export default StandAloneController;
