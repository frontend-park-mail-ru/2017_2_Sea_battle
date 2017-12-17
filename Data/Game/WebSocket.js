"use strict";

export default class WebSocketManager {

    constructor()
    {
        if (WebSocketManager.__instance) {
            return WebSocketManager.__instance;
        }

        this.socket = new WebSocket("wss://sea-battle-back.herokuapp.com/game");

        WebSocketManager.__instance = this;

        this.onopenSocket();
        this.oncloseSocket();

        this.startPing();
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

    startPing()
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
