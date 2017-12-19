"use strict";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";

import FirstGameScene from "./GameSceneFirst.js";
import SecondGameScene from "./GameSceneSecond.js";
import ShipList from "./ShipList.js";
import WebSocketManager from "./WebSocket.js";
import GameController from "./GameManager.js"
import GameLoader from "./GameLoader.js"


function startSecondGameScene (matrixShips, move) {
    let gameLoader = new GameLoader();
    gameLoader.hide();
    let secondGameScene = new SecondGameScene();
    secondGameScene.show(matrixShips, move);
}

function createShipArrayMessage(shipArray) {
    let message = {};
    message.class = "MsgShipPosition";
    message.ships = shipArray;
    message = JSON.stringify(message, "");
    return message;
}

function getRandomMatrixShipsMessage() {
    let message = {};
    message.class = "MsgGeneratedShips";
    message = JSON.stringify(message, "");
    return message;
}

function getRandomMatrixShips() {

    let gameContoller = new GameController();
    if (!gameContoller.getGame()) {
        getMatrixShips (1);
    }
    else {
        let webSocketManager = new WebSocketManager();
        webSocketManager.messageSocket( function(e) {
            let fieldData = e.data;
            fieldData = JSON.parse(fieldData);
            let fieldClass = fieldData.class;
            if ( fieldClass == "MsgShipPosition" ){
                let gameContoller = new GameController();
                gameContoller.setRandomResponse((fieldData.ships).reverse());
                getMatrixShips (1);
            }
            else if ( fieldClass == "MsgPing") {
                let webSocketManager = new WebSocketManager();
                webSocketManager.pingSocket();
            }
            else {
                console.log("Ошибка");
            }
        } );

        webSocketManager.sendSocket(getRandomMatrixShipsMessage());
    }

}

function getMatrixShips (rand = 0) {

    let shipList = new ShipList();
    if (shipList.canDoMatrix() || rand) {
        let matrixShips = shipList.CreateMatrix(rand);

        let firstGameScene = new FirstGameScene();
        firstGameScene.hide();

        let gameContoller = new GameController();
        if (!gameContoller.getGame()) {
            let secondGameScene = new SecondGameScene();
            secondGameScene.show(matrixShips);
        }
        else {
            let gameLoader = new GameLoader();
            gameLoader.show();

            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgGameStarted" ){
                    startSecondGameScene(matrixShips, fieldData.first);
                }
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    console.log("Ошибка");
                }
            });

            let shipMessage = createShipArrayMessage (shipList.createShipArray(rand));
            webSocketManager.sendSocket(shipMessage);
        }

    }
    else {
        let mb = new MessageBox("Placement error", "You haven't placed all the ships!");
    }

}

export {getMatrixShips, getRandomMatrixShips};
