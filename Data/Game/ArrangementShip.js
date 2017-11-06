"use strict";

/**
 * составной объект для хранения информации о переносе:
 * {
   *   elem - элемент, на котором была зажата мышь
   *   avatar - аватар
   *   downX/downY - координаты, на которых был mousedown
   *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
   * }
 */

import ShipList from "./ShipList.js";

 /*
    TO DO - разбить на 3 модуля (события мыши; подсветка и установка корабля; поворот кораблей)
 */

let dragObject = {};


let num_ship = 0;
let flag_turn = 0; // 0 - x, 1 - y


// перетаскивание кораблей
function onMouseDown(e) {

    if (e.which != 1) return;

    let elem = e.target.closest('.draggable');
    if (!elem) return;

    dragObject.elem = elem;
    num_ship = +elem.textContent;

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;


    return false;
}

function onMouseMove(e) {

    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // если перенос не начат...
        let moveX = e.pageX - dragObject.downX;
        let moveY = e.pageY - dragObject.downY;

        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        // начинаем перенос
        dragObject.avatar = createAvatar(e); // создать аватар
        dragObject.avatar.style.opacity = 0.5;
        if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
            dragObject = {};
            return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        let coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;

        startDrag(e); // отобразить начало переноса
    }

    // отобразить перенос объекта при каждом движении мыши
    dragObject.avatar.style.left = e.pageX - 15 + 'px';
    dragObject.avatar.style.top = e.pageY - 15 + 'px';


    backlight_removal();
    field_Lighting(e, flag_turn);


    return false;
}

function onMouseUp(e) {
    if (dragObject.avatar) { // если перенос идет
        finishDrag(e);
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    dragObject = {};
    num_ship = 0;
}

function finishDrag(e) {
    // flag = 0, нет свободного места, = 1 - можем ставить
    let flag = field_Lighting(e, flag_turn, 1);
    if (flag == 0) {
        dragObject.avatar.style.opacity = 1;
        dragObject.avatar.rollback();
    }
    else {
        // поставили корабль в свободные клетки и убрали "текстуру" корабля
        dragObject.elem.style.display = 'none';
    }

}

function createAvatar(e) {

    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    let avatar = dragObject.elem;
    let old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || '',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
    };

    // функция для отмены переноса
    avatar.rollback = function() {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
    };

    return avatar;
}

function startDrag(e) {
    let avatar = dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 999;
    avatar.style.position = 'absolute';
}

function AddMouseEvent () {
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;
}




function getCoords(elem) { // кроме IE8-
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

};


// __________________________________________

function getElemUnderMouse(event) {
    dragObject.avatar.hidden = true;
    let x = event.clientX;
    let y = event.clientY;
    let elem = document.elementFromPoint(x, y);
    dragObject.avatar.hidden = false;
    return elem;
}

// подсчитуем к-во свободных клеток
function getFreeFields(num_ship, flag_turn, event) {
    let el;

    let elem = getElemUnderMouse(event);

    if (elem == null) {

        // такое возможно, если курсор мыши "вылетел" за границу окна
        return false;
    }

    // возвращает элемент класса droppable по координатам
    el = elem.closest('.droppable');
    if (el == null) {
        return false;
    }


    for (let i = 0; i < num_ship; i++){
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

function putShip(num_ship, flag_turn, event, ship) {

    let elem = getElemUnderMouse(event); // крайняя левая клетка корабля
    let el; // исследуемая клетка
    let delEl; // удаляемся область

    // удаление клеток вокруг корабля
    if (ship) {
        for (let i = 0; i < num_ship; i++) {
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



    for (let i = 0; i < num_ship; i++){
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
            let shipList = new ShipList;
            let x = event.clientX;
            let y = event.clientY;
            let ship = document.elementFromPoint(x, y);
            shipList.setShipLiveField (+ship.id - 1, el.id); // добавляем в ячейку (ship.id - 1) значение el.id
        }
    }
}

// ставим метки для корабля или сам корабль
function field_Lighting(event, flag_turn, ship = 0) {

    // Можем поставить корабль (к-во незанятых клеток равно размеру корабля)
    if (getFreeFields(num_ship, flag_turn, event)) {

        putShip(num_ship, flag_turn, event, ship);

        return 1;
    }
    return 0;
}



// затирание старых меток кораблей
function backlight_removal () {
    let field = document.getElementsByClassName("droppable");
    for (let i = 0; i<field.length; i++) {
        field[i].style.cssText = "background-color: transparent;";
    }
};

// __________________________________________
// поворот кораблей

function turn_2 () {
    let shipX4 = document.getElementsByClassName("shipX2");
    if (flag_turn == 0){
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
};

function turn_3 () {
    let shipX4 = document.getElementsByClassName("shipX3");
    if (flag_turn == 0){
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
};


function turn_4 () {
    let shipX4 = document.getElementsByClassName("shipX4");
    if (flag_turn == 0){
        for (let i = 0; i< shipX4.length; i++){
            shipX4[i].style.height = "121px";
            shipX4[i].style.width = "20px";
        }
        flag_turn = 1;
    }
    else {
        for (let i = 0; i< shipX4.length; i++){
            shipX4[i].style.width = "121px";
            shipX4[i].style.height = "20px";
        }
        flag_turn = 0;
    }
};

function TurnShips () {
    turn_2();
    turn_3();
    turn_4();
};


export {AddMouseEvent, TurnShips};

