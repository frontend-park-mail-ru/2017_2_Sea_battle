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
        let shipX4 = document.getElementsByClassName("shipX2");
        if (!this.getFlag()){
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.height = "56px";
                shipX4[i].style.width = "20px";
            }
        }
        else {
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.width = "56px";
                shipX4[i].style.height = "20px";
            }
        }
    }

    turnShipX3 ()
    {
        let shipX4 = document.getElementsByClassName("shipX3");
        if (!this.getFlag()){
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.height = "88px";
                shipX4[i].style.width = "20px";
            }
        }
        else {
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.width = "88px";
                shipX4[i].style.height = "20px";
            }
        }
    }

    turnShipX4 ()
    {
        let shipX4 = document.getElementsByClassName("shipX4");
        if (!this.getFlag()){
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.height = "121px";
                shipX4[i].style.width = "20px";
            }
        }
        else {
            for (let i = 0; i< shipX4.length; i++){
                shipX4[i].style.width = "121px";
                shipX4[i].style.height = "20px";
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

