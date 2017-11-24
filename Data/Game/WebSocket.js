"use strict";

export default class WebSocketManager {

    constructor()
    {
        if (WebSocketManager.__instance) {
            return WebSocketManager.__instance;
        }

        this.socket = new WebSocket("ws://sea-battle-back.herokuapp.com/game"); // wss

        WebSocketManager.__instance = this;
    }

    openSocket ()
    {
        this.socket.onopen = function(event) {
            alert("Сессия открыта");
        };
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
            alert("Сессия закрыта");
        };
    }
}
