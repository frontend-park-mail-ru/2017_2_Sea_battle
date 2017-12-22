import {WinScene, LoseScene} from "./GameSceneWinLose.js"
import SecondGameScene from "./GameSceneSecond.js";
import WebSocketManager from "./WebSocket.js";
import GameController from "./GameManager.js"

// 0 - путое поле, (1-10) - корабль не поврежден, 100 - промах, -(1-10) - корабль поврежден

export default class GameLogic
{
    constructor(move = true)
    {

        if (GameLogic.__instance) {
            return GameLogic.__instance;
        }

        GameLogic.__instance = this;

        this.changeMove(move);

        this.messageOnGameLogic();
    }

    messageOnGameLogic() {
        if (!(this.move)) {
            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgResultMove" || fieldClass == "MsgShipIsDestroyed") {
                    let gameController = new GameController();
                    if (gameController.getGame() == 1) {
                        setTimeout(function () {
                            this.fireEnemy (fieldData)
                        }.bind(this), 1200);
                    }
                    else {
                        this.fireEnemy (fieldData)
                    }
                }
                else if (fieldClass == "MsgEndGame") {
                    this.endGame(fieldData)
                }
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    debugger;
                    console.log("Ошибка");
                }
            }.bind(this));
        }
    }

    changeMove(move)
    {
        this.move = move;

        this.gameScene = new SecondGameScene();
        if (!(this.move)) {
            this.gameScene.turn("Opponent's turn");
        }
        else {
            this.gameScene.turn("Your turn");
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
                    debugger;
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
                    debugger;
                    console.log("Ошибка");
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
        let fieldFire;
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire = document.getElementById(data.cell.rowPos  + "+" + data.cell.colPos);
            fieldFire.classList.remove("shipOK");
            fieldFire.classList.add("shipFire_animation");
            setTimeout(function () {
                fieldFire.classList.remove("shipFire_animation");
                fieldFire.classList.add("shipFire");
            }.bind(fieldFire), 1000);
            this.move = false;
            this.gameScene.turn("Opponent's turn");
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire = document.getElementById(data.cell.rowPos  + "+" + data.cell.colPos);
            fieldFire.classList.add("fieldFire_animation");
            setTimeout(function () {
                fieldFire.classList.remove("fieldFire_animation");
                fieldFire.classList.add("Fire");
            }.bind(fieldFire), 1000);
            this.move = true;
            this.gameScene.turn("Your turn");

        }
        if (data.class == "MsgShipIsDestroyed")
        {
            this.shipDead(data, "+");
            this.move = false;
            this.gameScene.turn("Opponent's turn");
        }
    }

    fireMe(data, fieldFire)
    {
        if (data.cellStatus == "ON_FIRE")
        {
            fieldFire.classList.add("shipFire_animation");
            setTimeout(function () {
                            fieldFire.classList.remove("shipFire_animation");
                            fieldFire.classList.add("shipFire");
                        }.bind(fieldFire), 1000);
            this.move = true;
            this.gameScene.turn("Your turn");
        }
        if (data.cellStatus == "BLOCKED")
        {
            fieldFire.classList.add("fieldFire_animation");
            setTimeout(function () {
                fieldFire.classList.remove("fieldFire_animation");
                fieldFire.classList.add("Fire");
            }.bind(fieldFire), 1000);
            this.move = false;
            this.gameScene.turn("Opponent's turn");
        }
        if (data.class == "MsgShipIsDestroyed")
        {
            fieldFire.classList.add("shipFire");
            this.shipDead(data, "-");
            this.move = true;
            this.gameScene.turn("Your turn");
        }

        if (!(this.move)) {
            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldData = e.data;
                fieldData = JSON.parse(fieldData);
                let fieldClass = fieldData.class;
                if ( fieldClass == "MsgResultMove" || fieldClass == "MsgShipIsDestroyed") {
                    let gameController = new GameController();
                    if (gameController.getGame() == 1) {
                        setTimeout(function () {
                            this.fireEnemy (fieldData)
                        }.bind(this), 1200);
                    }
                    else {
                        this.fireEnemy (fieldData)
                    }
                }
                else if (fieldClass == "MsgEndGame") {
                    this.endGame(fieldData)
                }
                else if ( fieldClass == "MsgPing") {
                    let webSocketManager = new WebSocketManager();
                    webSocketManager.pingSocket();
                }
                else {
                    debugger;
                    console.log("Ошибка");
                }
            }.bind(this));
        }

        // сообщение - стреляют по мне
    }

    shipDead (data, flag)
    {
        for (let i = 0; i < data.destroyedShip.length; i++) {
            let fieldDie;
            if (data.destroyedShip.isVertical) {
                fieldDie = document.getElementById((data.destroyedShip.rowPos + i) + flag + data.destroyedShip.colPos);
            }
            else {
                fieldDie = document.getElementById(data.destroyedShip.rowPos + flag + (data.destroyedShip.colPos + i));
            }
            fieldDie.classList.remove("shipOK");
            fieldDie.classList.remove("shipFire_animation");
            fieldDie.classList.remove("shipFire");
            fieldDie.classList.add("shipDie_animation");
            setTimeout(function () {
                fieldDie.classList.remove("shipFire_animation");
                fieldDie.classList.remove("shipFire");
                fieldDie.classList.remove("shipDie_animation");
                fieldDie.classList.add("shipDie");
            }.bind(fieldDie), 1000);
        }

        for (let i = 0; i < data.destroyedShip.cellsAroundShip.length; i++) {
            let field;
            field = document.getElementById(data.destroyedShip.cellsAroundShip[i].rowPos + flag + (data.destroyedShip.cellsAroundShip[i].colPos));
            field.classList.remove("Fire");
            field.classList.add("fieldFire_animation");
            setTimeout(function () {
                field.classList.remove("fieldFire_animation");
                field.classList.add("Fire");
            }.bind(field), 1000);
        }
    }

    endGame (data)
    {
        let secondGameScene = new SecondGameScene();
        secondGameScene.hide();
        let gameManager = new GameController();
        gameManager.setScore("Score: " + data.score);
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
