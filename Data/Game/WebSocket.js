"use strict";
import GameController from "./GameManager.js";

export default class WebSocketManager {

    constructor()
    {
        if (WebSocketManager.__instance) {
            return WebSocketManager.__instance;
        }

        WebSocketManager.__instance = this;
    }

    openSocket ()
    {
        this.socket = new WebSocket("wss://sea-battle-back.herokuapp.com/game");

        this.onopenSocket();
        this.oncloseSocket();
        this.pingSocketStart();
    }

    closeSocket ()
    {
        this.socket.close();
    }

    getStateSocket()
    {
        return this.state;
    }

    onopenSocket ()
    {
        this.socket.onopen = function(event) {
            this.pingSocket();
            this.state = true;
        }.bind(this);
    }

    oncloseSocket ()
    {
        this.socket.onclose = function(event) {
            this.state = false;
        }.bind(this);
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
