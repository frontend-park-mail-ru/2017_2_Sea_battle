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

    setShip(ship, i)
    {
        this.listShip[i] = ship;
    }

    setShipLiveField (i, field)
    {
        (this.getShip(i)).setLiveField(field);
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

    clearList()
    {
        this.listShip = [];
    }

}

