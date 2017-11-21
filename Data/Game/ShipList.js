"use strict";

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

    CreateMatrix()
    {
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

    createShipArray ()
    {
        let shipArray = [];
        for (let i = 0; i < 10; i++) {
            let ship = {};
            ship.length = this.getShip(i).getSize();
            ship.isVertical = (this.getTurnShip(i)) ? true : false;
            ship.rowPos = +((this.getShip(i).getLive())[0][0]);
            ship.colPos = +((this.getShip(i).getLive())[0][2]);
            shipArray[i] = ship; //JSON.stringify(ship);
        }
        return shipArray;
    }

    clearList()
    {
        this.listShip = [];
    }

}

