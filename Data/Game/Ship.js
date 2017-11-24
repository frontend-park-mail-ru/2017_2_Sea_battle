"use strict";

import Widget from "../Modules/Blocks/Widget.js";

/*
    Хранятся подбитые и целые поля, в будущем можно дописать логику на убитые поля
    (подсветка как убитый и подбитый) (см. TO DO GameLogic)

    А можно и в мультиплеере оставить так же на матрицах, ничего не переделывать
    (хз что лучше и адекватей)
 */

class Ship
{
    constructor(shipField, shipNum, countShip)
    {
        let inlineBlock = new Widget(document.body, "div", "inline_block");
        shipField.appendChildWidget(inlineBlock);
        let tableShip = new Widget(document.body, "table", "draggable");
        inlineBlock.appendChildWidget(tableShip);
        let tdShip = new Widget(document.body, "td", "shipX" + countShip);
        tdShip.text = countShip;
        tdShip.idName = shipNum; // место в ShipList (-1)
        tableShip.appendChildWidget(tdShip);

        this.shipSize = countShip; // size ship
        this.shipHP = countShip; // health point ship
        this.liveFields = [];
        this.deadFields = [];
        this.turn = 0;
    }

    getSize()
    {
        return this.shipSize;
    }

    getLive ()
    {
        return this.liveFields;
    }

    getDead ()
    {
        return this.deadFields;
    }

    getTurn ()
    {
        return this.turn;
    }

    setTurn (turn)
    {
        this.turn = turn;
    }

    setLiveField (field) {
        this.liveFields.push(field);
    }

    setDeadField (field) {
        this.deadFields.push(field);
        this.deleteLiveField (field);
    }

    deleteLiveField (field) {
        this.liveFields.splice(this.liveFields.indexOf(field), 1);
        this.shipHP--;
    }

}

export default Ship;
