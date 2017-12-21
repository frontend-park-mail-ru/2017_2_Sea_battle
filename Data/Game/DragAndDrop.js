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

import PutShipManager from "./PutShipManager.js"


let dragObject = {};

let putShipManager = new PutShipManager();
let numShip = 0;

// перетаскивание кораблей
function onMouseDown(e)
{

    let elem = e.target.closest('.draggable');

    if (!elem) return;

    dragObject.elem = elem;
    numShip = +elem.textContent;

    if (e.pageX) {
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;
    }
    else {
        dragObject.downX = e.changedTouches[0].pageX;
        dragObject.downY = e.changedTouches[0].pageY;
    }

    return false;
}

function onMouseMove(e)
{
    if (!dragObject.elem) return; // элемент не зажат
    if (!dragObject.avatar) { // если перенос не начат...

        let moveX = 0;
        let moveY = 0;
        if (e.pageX) {
            moveX = e.pageX - dragObject.downX;
            moveY = e.pageY - dragObject.downY;
        }
        else {
            moveX = e.changedTouches[0].pageX - dragObject.downX;
            moveY = e.changedTouches[0].pageY - dragObject.downY;
        }


        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }


        // начинаем перенос
        dragObject.avatar = createAvatar(); // создать аватар
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

        startDrag(); // отобразить начало переноса
    }

    // отобразить перенос объекта при каждом движении мыши
    if (e.pageX) {
        dragObject.avatar.style.left = e.pageX - 15 + 'px';
        dragObject.avatar.style.top = e.pageY - 15 + 'px';
    }
    else {
        dragObject.avatar.style.left = e.changedTouches[0].pageX - 15 + 'px';
        dragObject.avatar.style.top = e.changedTouches[0].pageY - 15 + 'px';
    }

    putShipManager.removalBacklight();
    putShipManager.fieldLighting(event, numShip, dragObject);

    return false;
}

function onMouseUp(e)
{
    if (dragObject.avatar) { // если перенос идет
        finishDrag();
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    dragObject = {};
    numShip = 0;
}

function finishDrag()
{
    // flag = 0, нет свободного места, = 1 - можем ставить
    let flag = putShipManager.fieldLighting(event, numShip, dragObject, 1);
    if (!flag) {
        dragObject.avatar.style.opacity = 1;
        dragObject.avatar.rollback();
    }
    else {
        // поставили корабль в свободные клетки и убрали "текстуру" корабля
        dragObject.elem.style.display = 'none';
    }
}

function createAvatar()
{

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

function startDrag()
{
    let avatar = dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 999;
    avatar.style.position = 'absolute';
}

function getCoords(elem) // кроме IE8-
{
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

function AddDragAndDropEvent ()
{
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);

    document.addEventListener("pointerdown", onMouseDown);
    document.addEventListener("pointermove", onMouseMove);
    document.addEventListener("pointerup", onMouseUp);
}



export default AddDragAndDropEvent;

