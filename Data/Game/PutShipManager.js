"use strict";

import ShipList from "./ShipList.js";
import TurnManager from "./TurnManager.js";

export default class PutShipManager
{

    // ставим метки для корабля или сам корабль
    fieldLighting (event, numShip, dragObject, ship = 0)
    {
        let turnManager = new TurnManager();

        // Можем поставить корабль (к-во незанятых клеток равно размеру корабля)
        if (this.getFreeFields(numShip, turnManager.getFlag(), event, dragObject)) {

            this.putShip(numShip, turnManager.getFlag(), event, dragObject, ship);

            return 1;
        }
        return 0;
    }

    // затирание старых меток кораблей
    removalBacklight ()
    {
        let field = document.getElementsByClassName("droppable");
        for (let i = 0; i<field.length; i++) {
            field[i].style.cssText = "background-color: transparent;";
        }
    }

    // подсчитуем к-во свободных клеток
    // true - можем поставить корабль, false - не можем
    getFreeFields(numShip, flag_turn, event, dragObject)
    {
        let el;

        let elem = this.getElemUnderMouse(event, dragObject);

        if (elem == null) {

            // такое возможно, если курсор мыши "вылетел" за границу окна
            return false;
        }

        // возвращает элемент класса droppable по координатам
        el = elem.closest('.droppable');
        if (el == null) {
            return false;
        }


        for (let i = 0; i < numShip; i++){
            if (!flag_turn) {
                elem = document.getElementById((+el.id[0]) + " " + (+el.id[2] + i));
            }
            else {
                elem = document.getElementById((+el.id[0] + i) + " " + (+el.id[2]));
            }
            if (elem == null) {
                return false;
            }
            if (!elem.classList.contains('droppable')) {
                return false;
            }
        }

        return true;
    }

    putShip(numShip, flag_turn, event, dragObject, ship)
    {
        let elem = this.getElemUnderMouse(event, dragObject); // крайняя левая клетка корабля
        let el; // исследуемая клетка
        let delEl; // удаляемся область

        // удаление клеток вокруг корабля
        if (ship) {
            for (let i = 0; i < numShip; i++) {
                if (!flag_turn) {
                    el = document.getElementById((+elem.id[0]) + " " + (+elem.id[2] + i));
                }
                else {
                    el = document.getElementById((+elem.id[0] + i) + " " + (+elem.id[2]));
                }
                for (let k = -1; k < 2; k++) {
                    for (let z = -1; z < 2; z++) {
                        delEl = document.getElementById((+el.id[0] + k) + " " + (+el.id[2] + z));
                        if (!delEl) {
                            continue;
                        }
                        delEl.classList.remove("droppable");
                        delEl.style.cssText = "background-color: yellow;";
                    }
                }
            }
        }



        for (let i = 0; i < numShip; i++){
            if (!flag_turn) {
                el = document.getElementById((+elem.id[0]) + " " + (+elem.id[2] + i));
            }
            else {
                el = document.getElementById((+elem.id[0] + i) + " " + (+elem.id[2]));
            }

            if (!ship) {
                // метка - можем поставить сюда корабль
                el.style.cssText = "background-color: red;";
            }
            else{
                // ставим корабль на метку
                el.style.cssText = "background-color: greenyellow;";
                el.classList.add("ship");
                el.classList.remove("droppable");

                // добавляем в ShipList
                let shipList = new ShipList();
                let x = event.clientX;
                let y = event.clientY;
                let ship = document.elementFromPoint(x, y);
                shipList.setShipLiveField (+ship.id - 1, el.id); // добавляем в ячейку (ship.id - 1) значение el.id
            }
        }
    }

    getElemUnderMouse(event, dragObject)
    {
        dragObject.avatar.hidden = true;
        let x = event.clientX;
        let y = event.clientY;
        let elem = document.elementFromPoint(x, y);
        dragObject.avatar.hidden = false;
        return elem;
    }

}
