"use strict";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";

import FirstGameScene from "./GameSceneFirst.js";
import SecondGameScene from "./GameSceneSecond.js";
import ShipList from "./ShipList.js";
import WebSocketManager from "./WebSocket.js";
import GameController from "./GameController.js"


function startSecondGameScene (matrixShips, move) {
    let secondGameScene = new SecondGameScene();
    secondGameScene.show(matrixShips, move);
}

function createShipArrayMessage(shipArray) {
    let massage = {};
    massage.class = "MsgShipPosition";
    massage.ships = shipArray;
    massage = JSON.stringify(massage, "");
    return massage;
}

function getMatrixShips () {

    let shipList = new ShipList();
    if (shipList.canDoMatrix()) {
        let matrixShips = shipList.CreateMatrix();

        let firstGameScene = new FirstGameScene();
        firstGameScene.hide();

        let gameContoller = new GameController();
        if (!gameContoller.getGame()) {
            let secondGameScene = new SecondGameScene();
            secondGameScene.show(matrixShips);
        }
        else {
            let webSocketManager = new WebSocketManager();
            let shipMessage = createShipArrayMessage (shipList.createShipArray());
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
                    alert("Ошибка");
                }
            } );

            webSocketManager.sendSocket(shipMessage);

            alert("Ожидание противника");
        }

    }
    else {
        let mb = new MessageBox("Placement error", "You haven't placed all the ships!");
    }

};

export default getMatrixShips;
