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

        if (!(this.move)) {
            let webSocketManager = new WebSocketManager();
            webSocketManager.messageSocket( function(e) {
                let fieldClass = e.data;
                fieldClass = JSON.parse(fieldClass);
                fieldClass = fieldClass.class;
                if ( true ){
                    this.fireEnemy (e.data);
                }
                else {
                    alert("Ошибка");
                }
            } );
        }

        this.won = -1; // 0 - проиграл, 1 - выиграл
    }

    shot (field)
    {
        if (this.move) {
            let shotMessage = this.createShot(field);

            let webSocketManager = new WebSocketManager();

            webSocketManager.sendSocket(shotMessage);

            // webSocketManager.messageSocket( function(e) {
            //     let fieldClass = e.data;
            //     fieldClass = JSON.parse(fieldClass);
            //     fieldClass = fieldClass.class;
            //     if ( fieldClass == "MsgGameStarted" ){
            //         startSecondGameScene(matrixShips, move);
            //     }
            //     else {
            //         alert("Ошибка");
            //     }
            // } );
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
    }

}
