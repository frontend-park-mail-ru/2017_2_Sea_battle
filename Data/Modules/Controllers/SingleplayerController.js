"use strict";

import {startGame,hideUserBlock} from "../../Game/StartGame.js";
import GameScene from "../../Game/GameScene.js";
import WebSocketManager from "../../Game/WebSocket.js";

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
        let webSocket = new WebSocketManager();
        if (webSocket.getStateSocket()) {
            webSocket.closeSocket();
        }
        hideUserBlock(false);
        let gameScene = new GameScene();
        gameScene.hide();
    }

}

export default SingleplayerController;
