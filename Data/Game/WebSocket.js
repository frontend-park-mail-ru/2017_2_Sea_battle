"use strict";

export default class WebSocketManager {

    constructor()
    {
        if (WebSocketManager.__instance) {
            return WebSocketManager.__instance;
        }

        this.socket = new WebSocket("ws://sea-battle-back.herokuapp.com/game");

        WebSocketManager.__instance = this;
    }

    openSocket (callback)
    {
        this.socket.onopen = callback;
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
            // if (event.wasClean) {
            //     alert('Соединение закрыто чисто');
            // } else {
            //     alert('Обрыв соединения'); // например, "убит" процесс сервера
            // }
            // alert('Код: ' + event.code + ' причина: ' + event.reason);
        };
    }
}
