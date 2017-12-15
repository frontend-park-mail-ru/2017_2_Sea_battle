"use strict";

export default class WebSocketManager {

    constructor()
    {
        if (WebSocketManager.__instance) {
            return WebSocketManager.__instance;
        }

        this.socket = new WebSocket("wss://sea-battle-back.herokuapp.com/game");

        WebSocketManager.__instance = this;

        this.messagePing = {};
        this.messagePing.class = "MsgPing";
        this.messagePing = JSON.stringify(this.messagePing, "");
    }

    openSocket ()
    {
        this.socket.onopen = function(event) {
            this.pingSocket();
            console.log("Сессия открыта");
        }.bind(this);
    }

    sendSocket (message)
    {
        this.socket.send(message);
    }

    messageSocket (func)
    {
        this.socket.onmessage = function(event) {
            func(event);
        };
    }

    closeSocket ()
    {
        this.socket.onclose = function(event) {
            console.log("Сессия закрыта");
        };
    }

    pingSocket()
    {
        this.sendSocket(this.messagePing);
    }
}
