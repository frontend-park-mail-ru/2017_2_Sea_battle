"use strict";


import FirstGameScene from "./GameSceneFirst.js";
import WebSocketManager from "./WebSocket.js";
import GameController from "./GameManager.js";
import GameLoader from "./GameLoader.js";

// TO DO - Работа с DOM через мэнэджер document.getID -> в мэнэджер и его дергать
// Все комментарии для GameScene (1 и 2)
// Кнопки [перезагрузки поля], чтобы поле и кнопки не бегали вверх/вниз, фон за полем
// убрать _
// Добавить кнопку назад в меню [прекратить игру]

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

function startGame(message)
{
    let gameContoller = new GameController();
    gameContoller.setGame(message);

    hideUserBlock(true);

    if (gameContoller.getGame()) {
        let webSocketManager = new WebSocketManager();
        webSocketManager.openSocket();
        webSocketManager.messageSocket(startFirstGameScene);
    }
    else {
        let userName = document.getElementsByClassName("userName");
        gameContoller.setUserName(userName[0].innerHTML);
        let userScore = document.getElementsByClassName("userScore");
        gameContoller.setScore(userScore[0].innerHTML);
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
