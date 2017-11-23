"use strict";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";

import FirstGameScene from "./GameSceneFirst.js";
import SecondGameScene from "./GameSceneSecond.js";
import ShipList from "./ShipList.js";
import WebSocketManager from "./WebSocket.js";


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

        // let secondGameScene = new SecondGameScene();
        // secondGameScene.show(matrixShips);


        let webSocketManager = new WebSocketManager();
        let shipMessage = createShipArrayMessage (shipList.createShipArray());
        webSocketManager.messageSocket( function(e) {
            let fieldClass = e.data;
            fieldClass = JSON.parse(fieldClass);
            fieldClass = fieldClass.class;
            if ( fieldClass == "MsgGameStarted" ){
                startSecondGameScene(matrixShips, move);
            }
            else {
                alert("Ошибка");
            }
        } );

        webSocketManager.sendSocket(shipMessage);


        alert("Ожидание противника");


    }
    else {
        let mb = new MessageBox("Placement error", "You haven't placed all the ships!");
    }

};

export default getMatrixShips;
