"use strict";

import startGame from "../../Game/StartGame.js";
import GameScene from "../../Game/GameScene.js";

const MULTIPLAYER = 2;

class MultiplayerController
{
    constructor()
    {
        this.url = "/startGame/multiplayer";
    }

    show()
    {
        startGame(MULTIPLAYER);
    }

    hide()
    {
        let gameScene = new GameScene();
        gameScene.hide();
    }

}

export default MultiplayerController;
