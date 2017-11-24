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
                if ( fieldClass == "MsgResultMove" ){
                    this.fireEnemy (e.data);
                }
                else {
                    alert("Ошибка");
                }
            }.bind(this));
        }

        this.won = -1; // 0 - проиграл, 1 - выиграл
    }

    shot (fieldFire)
    {
        if (this.move) {
            let shotMessage = this.createShot(fieldFire);

            let webSocketManager = new WebSocketManager();

            webSocketManager.sendSocket(shotMessage);

            // жду ответа, попал ли я
            webSocketManager.messageSocket( function(e) {
                let fieldClass = e.data;
                fieldClass = JSON.parse(fieldClass);
                fieldClass = fieldClass.class;
                if ( fieldClass == "MsgResultMove" ){
                    this.fireMe(e.data, fieldFire);
                }
                else {
                    alert("Ошибка");
                }
            }.bind(this));
        }

        // if (this.won == 1) {
        //     let secondGameScene = new SecondGameScene();
        //     secondGameScene.hide();
        //     let winScene = new WinScene();
        //     winScene.show();
        // }
        // else if (!(this.won)) {
        //     let secondGameScene = new SecondGameScene();
        //     secondGameScene.hide();
        //     let loseScene = new LoseScene();
        //     loseScene.show();
        // }
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
        debugger;
        // если попал, то отрисовываю
        // иниче мой ход
        this.move = true;
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
        // обработка куда попал
        // если попал, то мой ход
        // иначе ход противника и стреляют по мне
        // сообщение - стреляют по мне
    }

}
