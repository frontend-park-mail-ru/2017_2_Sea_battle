"use strict";
import GameController from "./GameManager.js";

export default class WebSocketManager {

    constructor()
    {
        let gameContoller = new GameController();
        if (WebSocketManager.__instance && gameContoller.getState()) {
            return WebSocketManager.__instance;
        }

        this.socket = new WebSocket("wss://sea-battle-back.herokuapp.com/game");

        WebSocketManager.__instance = this;

        this.onopenSocket();
        this.oncloseSocket();

        this.pingSocketStart();
    }

    onopenSocket ()
    {
        this.socket.onopen = function(event) {
            this.pingSocket();
            console.log("Сессия открыта");
        }.bind(this);
    }

    oncloseSocket ()
    {
        this.socket.onclose = function(event) {
            console.log("Сессия закрыта");
        };
    }

    messageSocket (func)
    {
        this.socket.onmessage = function(event) {
            func(event);
        };
    }

    sendSocket (message)
    {
        this.socket.send(message);
    }

    closeSocket ()
    {
        this.socket.close();
    }

    pingSocketStart()
    {
        this.messagePing = {};
        this.messagePing.class = "MsgPing";
        this.messagePing = JSON.stringify(this.messagePing, "");
    }

    pingSocket()
    {
        this.sendSocket(this.messagePing);
    }
}
