"use strict";


export default class GameController {
    constructor() {
        if (GameController.__instance) {
            return GameController.__instance;
        }

        GameController.__instance = this;
    }

    getGame ()
    {
        return this.game;
    }

    setGame(newGame)
    {
        this.game = newGame;
    }
}
