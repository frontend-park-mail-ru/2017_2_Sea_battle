"use strict";

import startGame from "../../Game/StartGame.js";
import GameScene from "../../Game/GameScene.js";

const SINGLEPLAYER = 1;

class SingleplayerController
{
    constructor()
    {
        this.url = "/startGame/online";
    }

    show()
    {
        startGame(SINGLEPLAYER);
    }

    hide()
    {
        let gameScene = new GameScene();
        gameScene.hide();
    }

}

export default SingleplayerController;
