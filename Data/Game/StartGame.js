"use strict";


import FirstGameScene from "./GameSceneFirst.js";
import WebSocketManager from "./WebSocket.js";
import GameController from "./GameManager.js";
import GameLoader from "./GameLoader.js";
import MessageBox from "../Modules/Blocks/MessageBox/MessageBox.js";
import {BackMenu} from "./GameSceneWinLose.js";

function playWithBotMessage (bot) {
    let message = {};
    message.class = "MsgJoinGame";
    if (bot == 1) {
        message.playWithBot = true;
    }
    else {
        message.playWithBot = false;
    }
    message = JSON.stringify(message, "");
    return message;
}

function startFirstGameScene (e) {
    let fieldData = e.data;
    fieldData = JSON.parse(fieldData);
    let fieldClass = fieldData.class;
    if ( fieldClass == "MsgYouInQueue" ){
        let gameLoader = new GameLoader();
        gameLoader.show();
        let gameContoller = new GameController();
        gameContoller.setUserName(fieldData.nickname);
        // Хочу ли я играть с ботом?
        let webSocketManager = new WebSocketManager();
        webSocketManager.sendSocket(playWithBotMessage(gameContoller.getGame()))
    }
    else if ( fieldClass == "MsgLobbyCreated" ) {
        let gameContoller = new GameController();
        gameContoller.setEmemyName(fieldData.usernameEnemy);
        let gameLoader = new GameLoader();
        gameLoader.hide();
        let firstScene = new FirstGameScene();
        firstScene.show();
    }
    else if ( fieldClass == "MsgPing") {
        let webSocketManager = new WebSocketManager();
        webSocketManager.pingSocket();
    }
    else {
        console.log("Ошибка");
    }
}

// false -  нет интернета, true - есть
function connection() {
    return true;
}

function startGame(message)
{

    hideUserBlock(true);

    let gameContoller = new GameController();

    // navigator.connection.rtt = 0 - нет интернета; все остальное - есть
    // navigator.connection.rtt - есть; !(navigator.connection.rtt) - нет

    //проверка на интернет
    let userScore = document.getElementsByClassName("userScore");
    if (connection() && message) {
        gameContoller.setGame(message);
    }
    else if (!connection() && message == 2 && userScore[0]) {
        new MessageBox("There is no connection to the Internet. Only single player mode is available.");
        BackMenu();
        return;
    }
    else {
        gameContoller.setGame(0);
    }



    if (gameContoller.getGame()) {
        let webSocketManager = new WebSocketManager();
        webSocketManager.openSocket();
        webSocketManager.messageSocket(startFirstGameScene);
    }
    else {
        let userName = document.getElementsByClassName("userName");
        let userScore = document.getElementsByClassName("userScore");
        if (userScore[0]) {
            gameContoller.setUserName(userName[0].innerHTML);
            gameContoller.setScore(userScore[0].innerHTML);
        }
        else {
            gameContoller.setUserName("Mysterious stranger");
            gameContoller.setScore("Score: 0");
        }
        gameContoller.setEmemyName("Mysterious stranger");
        let firstScene = new FirstGameScene();
        firstScene.show();
    }

    // let firstScene = new FirstGameScene();
    // firstScene.show();


    // let firstScene;
    // if (!(navigator.connection.rtt)) {
    //     // нет интернета
    //     firstScene = new FirstGameScene();
    //     firstScene.show();
    // }
    // else {
    //     // есть интернет
    //     firstScene = new FirstGameScene();
    //     firstScene.show();
    // }
}

function hideUserBlock(hide = true) {
    let el = document.getElementsByClassName("profileBlock");
    if (el[0]) {
        if (hide) {
            el[0].classList.add("display_none");
        }
        else {
            el[0].classList.remove("display_none");
        }
    }
}

export {startGame,hideUserBlock}
