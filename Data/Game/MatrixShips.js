"use strict";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";

import FirstGameScene from "./GameSceneFirst.js";
import SecondGameScene from "./GameSceneSecond.js";
import ShipList from "./ShipList.js";
import WebSocketManager from "./WebSocket.js";


function startSecondGameScene (matrixShips) {
    let secondGameScene = new SecondGameScene();
    secondGameScene.show(matrixShips);
}


function getMatrixShips () {

    let shipList = new ShipList();
    if (shipList.canDoMatrix()) {
        let matrixShips = shipList.CreateMatrix();

        let firstGameScene = new FirstGameScene();
        firstGameScene.hide();

        let webSocketManager = new WebSocketManager();
        let shipArray = shipList.createShipArray();

        webSocketManager.messageSocket( () => {startSecondGameScene(matrixShips)} );
        webSocketManager.sendSocket(shipArray);

        alert("Ожидание игрока")

    }
    else {
        let mb = new MessageBox("Placement error", "You haven't placed all the ships!");
    }

};

export default getMatrixShips;
