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

    getUserName ()
    {
        return this.userName;
    }

    setUserName (newName)
    {
        this.userName = newName;
    }

    getEmemyName ()
    {
        return this.ememyName;
    }

    setEmemyName (newName)
    {
        this.ememyName = newName;
    }

    getScore ()
    {
        return this.score;
    }

    setScore(newScore)
    {
        this.score = newScore;
    }

    setRandomMatrix(newMatrix)
    {
        this.randMatrix = newMatrix;
    }

    getRandomMatrix()
    {
        return this.randMatrix;
    }

    setRandomResponse(response)
    {
        this.randResponse = response;
    }

    getRandomResponse()
    {
        return this.randResponse;
    }
}
