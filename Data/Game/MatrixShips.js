"use strict";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";

import {createSecoundGameScene} from "./CreateGame.js";
import ShipList from "./ShipList.js";

function getMatrixShips () {

    let shipList = new ShipList();

    if (shipList.canDoMatrix()) {
        let matrixShips = shipList.CreateMatrix();

        let allGame = document.getElementsByClassName("all_game");
        document.body.removeChild(allGame[0]);
        createSecoundGameScene(matrixShips);
    }
    else {
        let mb = new MessageBox("Placement error", "You haven't placed all the ships!");
    }

};

export default getMatrixShips;
