import {WinScene, LoseScene} from "./GameSceneWinLose.js"
import SecondGameScene from "./GameSceneSecond.js";
import WebSocketManager from "./WebSocket.js";

// 0 - путое поле, (1-10) - корабль не поврежден, 100 - промах, -(1-10) - корабль поврежден

export default class GameLogic
{
    constructor(move = true)
    {
        if (GameLogic.__instance) {
            return GameLogic.__instance;
        }

        GameLogic.__instance = this;

        this.move = move;

        // стреляют по мне
        if (!(this.move)) {
            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgResultMove" || fieldClass == "MsgShipIsDestroyed") {
                    this.fireEnemy (fieldData);
                }
                else if (fieldClass == "MsgEndGame") {
                    this.endGame(fieldData)
                }
                else {
                    alert("Ошибка");
                }
            }.bind(this));
        }
    }

    shot (fieldFire)
    {
        if (this.move) {
            let shotMessage = this.createShot(fieldFire);

            let webSocketManager = new WebSocketManager();

            webSocketManager.sendSocket(shotMessage);

            // жду ответа, попал ли я
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgResultMove" || fieldClass == "MsgShipIsDestroyed"){
                    this.fireMe(fieldData, fieldFire);
                }
                else if (fieldClass == "MsgEndGame") {
                    this.endGame(fieldData)
                }
                else {
                    alert("Ошибка");
                }
            }.bind(this));
        }
    }

    createShot(fieldFire)
    {
        let coordinates = {};
        coordinates.rowPos = +fieldFire.id[0];
        coordinates.colPos = +fieldFire.id[2];

        let massage = {};
        massage.class = "MsgFireCoordinates";
        massage.coordinates = coordinates;
        massage = JSON.stringify(massage, "");
        return massage;
    }

    fireEnemy (data)
    {
        let fieldFire = document.getElementById(data.cell.rowPos  + "+" + data.cell.colPos);
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire.classList.remove("shipOK");
            fieldFire.classList.add("shipFire");
            this.move = false;
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire.classList.add("Fire");
            this.move = true;
        }
        if (data.class == "MsgShipIsDestroyed")
        {
            fieldFire.classList.remove("shipOK");
            fieldFire.classList.add("shipFire");
            this.shipDead(data, "+");
            this.move = false;
        }
    }

    fireMe(data, fieldFire)
    {
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire.classList.add("shipFire");
            this.move = true;
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire.classList.add("Fire");
            this.move = false;
        }
        if (data.class == "MsgShipIsDestroyed")
        {
            fieldFire.classList.add("shipFire");
            this.shipDead(data, "-");
            this.move = true;
        }

        if (!(this.move)) {
            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgResultMove" || fieldClass == "MsgShipIsDestroyed") {
                    this.fireEnemy (fieldData);
                }
                else if (fieldClass == "MsgEndGame") {
                    this.endGame(fieldData)
                }
                else {
                    alert("Ошибка");
                }
            }.bind(this));
        }

        // сообщение - стреляют по мне
    }

    shipDead (data, flag)
    {
        let fieldDie;
        for (let i = 0; i < data.length; i++) {
            if (data.destroyedShip.isVertical) {
                fieldDie = document.getElementById((data.destroyedShip.rowPos + i) + flag + data.destroyedShip.colPos);
            }
            else {
                fieldDie = document.getElementById(data.destroyedShip.rowPos + flag + (data.destroyedShip.colPos + i));
            }
            fieldDie.classList.add("shipDie");
        }
    }

    endGame (data)
    {
        let secondGameScene = new SecondGameScene();
        secondGameScene.hide();
        if (data.won) {
            let winScene = new WinScene();
            winScene.show();
        }
        else {
            let loseScene = new LoseScene();
            loseScene.show();
        }
    }

}
