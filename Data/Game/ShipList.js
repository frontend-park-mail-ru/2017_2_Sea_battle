"use strict";

import GameManager from "./GameManager.js"

/*
    Необходим для связи всех кораблей при создании и расстановке.
    Создает матрицу на основе всех кораблей.
 */

export default class ShipList
{
    constructor()
    {
        if (ShipList.__instance) {
            return ShipList.__instance;
        }
        this.listShip = [];

        ShipList.__instance = this;
    }

    getShip(i)
    {
        return this.listShip[i];
    }

    getTurnShip (i)
    {
        return (this.getShip(i)).getTurn();
    }

    setShip(ship, i)
    {
        this.listShip[i] = ship;
    }

    setShipLiveField (i, field)
    {
        (this.getShip(i)).setLiveField(field);
    }

    setTurnShip (i, turn)
    {
        (this.getShip(i)).setTurn(turn);
    }

    canDoMatrix ()
    {
        for (let i = 0; i < this.listShip.length; i++) {
            let ship = this.getShip(i);
            if (!(ship.getLive().length)) {
                return false;
            }
        }
        return true;
    }

    CreateMatrix(rand)
    {
        if (rand) {
            let gameManager = new GameManager();
            if(!gameManager.getGame()) {
                return [1, 0, 0, 0, 6, 6, 0, 0, 7, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 7, 0,
                        0, 0, 0, 5, 5, 0, 0, 0, 0, 0,
                        3, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 10, 0, 0, 0, 0, 0, 2, 0, 0,
                        0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                        0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                        0, 10, 0, 0, 8, 0, 0, 9, 9, 9,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                return this.createRandomMatrix();
            }
        }

        let matrixShips = [];
        for (let i = 0; i < 100; i++) {
            matrixShips[i] = 0;
        }
        for (let i = 0; i < this.listShip.length; i++) {
            let ship = this.getShip(i);
            let liveShip = ship.getLive();
            for (let j = 0; j < liveShip.length; j++) {
                matrixShips[(+liveShip[j][0]) * 10 + (+liveShip[j][2])] = i+1; // поле в матрице = id корабля
            }
        }

        return matrixShips;
    }

    createShipArray (rand = 0)
    {
        let shipArray = [];
        if (rand) {
            let gameManager = new GameManager();
            let ships = gameManager.getRandomResponse();
            for (let i = 0; i < ships.length; i++) {
                let ship = {};
                ship.length = ships[i].length;
                ship.isVertical = ships[i].isVertical;
                ship.rowPos = ships[i].rowPos;
                ship.colPos = ships[i].colPos;
                shipArray[i] = ship;
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                let ship = {};
                ship.length = this.getShip(i).getSize();
                ship.isVertical = (this.getTurnShip(i)) ? true : false;
                ship.rowPos = +((this.getShip(i).getLive())[0][0]);
                ship.colPos = +((this.getShip(i).getLive())[0][2]);
                shipArray[i] = ship;
            }
        }
        return shipArray;
    }

    clearList()
    {
        this.listShip = [];
    }

    createRandomMatrix()
    {
        let gameManager = new GameManager();
        let ships = gameManager.getRandomResponse();
        let matrixShips = [];
        for (let i = 0; i < 100; i++) {
            matrixShips[i] = 0;
        }
        for (let i = 0; i < ships.length; i++) {
            let ship = ships[i];
            for (let j = 0; j < ship.cells.length; j++) {
                matrixShips[(+ship.cells[j].rowPos) * 10 + (+ship.cells[j].colPos)] = i+1; // поле в матрице = id корабля
            }
        }
        return matrixShips;
    }

}

