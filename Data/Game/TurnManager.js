"use strict";


export default class TurnManager
{
    constructor()
    {
        if (TurnManager.__instance) {
            return TurnManager.__instance;
        }

        this.flag = 0; // 0 - x, 1 - y

        TurnManager.__instance = this;
    }

    turnShips ()
    {
        this.turnShipX2();
        this.turnShipX3();
        this.turnShipX4();
        this.changeFlag();
    }

    turnShipX2 ()
    {
        let shipX = document.getElementsByClassName("shipX2");
        if (!this.getFlag()){
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.height = "74px";
                shipX[i].style.width = "38px";
            }
        }
        else {
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.width = "74px";
                shipX[i].style.height = "38px";
            }
        }
    }

    turnShipX3 ()
    {
        let shipX = document.getElementsByClassName("shipX3");
        if (!this.getFlag()){
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.height = "112px";
                shipX[i].style.width = "38px";
            }
        }
        else {
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.width = "112px";
                shipX[i].style.height = "38px";
            }
        }
    }

    turnShipX4 ()
    {
        let shipX = document.getElementsByClassName("shipX4");
        if (!this.getFlag()){
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.height = "154px";
                shipX[i].style.width = "38px";
            }
        }
        else {
            for (let i = 0; i< shipX.length; i++){
                shipX[i].style.width = "154px";
                shipX[i].style.height = "38px";
            }
        }
    }

    getFlag ()
    {
        return this.flag;
    }

    setFlag (newFlag)
    {
        this.flag = newFlag;
    }

    changeFlag ()
    {
        if (this.getFlag()) {
            this.setFlag(0);
        }
        else {
            this.setFlag(1);
        }
    }

    clearFlag ()
    {
        this.setFlag(0);
    }
}

