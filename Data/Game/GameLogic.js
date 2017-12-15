import {WinScene, LoseScene} from "./GameSceneWinLose.js"
import SecondGameScene from "./GameSceneSecond.js";
import WebSocketManager from "./WebSocket.js";
import Widget from "../Modules/Blocks/Widget.js";

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
            this.turn("Opponent's move");
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
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    console.log("Ошибка");
                }
            }.bind(this));
        }
        else {
            this.turn("Your turn");
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
                else if (fieldClass == "MsgError" && fieldData.error == "unacceptable move ") {

                }
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    console.log("Ошибка");
                }
            }.bind(this));
        }
        else {
            alert("Ожидание хода противника");
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
        let fieldFire;
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire = document.getElementById(data.cell.rowPos  + "+" + data.cell.colPos);
            fieldFire.classList.remove("shipOK");
            fieldFire.classList.add("shipFire");
            this.move = false;
            this.turn("Opponent's move");
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire = document.getElementById(data.cell.rowPos  + "+" + data.cell.colPos);
            fieldFire.classList.add("Fire");
            this.move = true;
            this.turn("Your turn");

        }
        if (data.class == "MsgShipIsDestroyed")
        {
            this.shipDead(data, "+");
            this.move = false;
            this.turn("Opponent's move");
        }
    }

    fireMe(data, fieldFire)
    {
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire.classList.add("shipFire");
            this.move = true;
            this.turn("Your turn");
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire.classList.add("Fire");
            this.move = false;
            this.turn("Opponent's move");
        }
        if (data.class == "MsgShipIsDestroyed")
        {
            fieldFire.classList.add("shipFire");
            this.shipDead(data, "-");
            this.move = true;
            this.turn("Your turn");
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
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    console.log("Ошибка");
                }
            }.bind(this));
        }

        // сообщение - стреляют по мне
    }

    shipDead (data, flag)
    {
        let field;
        for (let i = 0; i < data.destroyedShip.length; i++) {
            if (data.destroyedShip.isVertical) {
                field = document.getElementById((data.destroyedShip.rowPos + i) + flag + data.destroyedShip.colPos);
            }
            else {
                field = document.getElementById(data.destroyedShip.rowPos + flag + (data.destroyedShip.colPos + i));
            }
            field.classList.remove("shipOK");
            field.classList.remove("shipFire");
            field.classList.add("shipDie");
        }

        for (let i = 0; i < data.destroyedShip.cellsAroundShip.length; i++) {
            field = document.getElementById(data.destroyedShip.cellsAroundShip[i].rowPos + flag + (data.destroyedShip.cellsAroundShip[i].colPos));
            field.classList.remove("Fire");
            field.innerHTML = "X";
        }

    }

    turn(turn)
    {
        let elem = document.getElementsByClassName("h1_turn");
        if (elem[0]) {
            document.body.removeChild(elem[0]);
        }
        elem = new Widget(document.body, "h1", "inline_block h1_turn");
        elem.text = turn;
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
