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

    if (e.which != 1) return;

    let elem = e.target.closest('.draggable');
    if (!elem) return;

    dragObject.elem = elem;
    numShip = +elem.textContent;

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;


    return false;
}

function onMouseMove(e)
{

    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // если перенос не начат...
        let moveX = e.pageX - dragObject.downX;
        let moveY = e.pageY - dragObject.downY;

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
    dragObject.avatar.style.left = e.pageX - 15 + 'px';
    dragObject.avatar.style.top = e.pageY - 15 + 'px';


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

function AddDragAndDropEvent ()
{
    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    document.touchstart = onMouseDown;
    document.touchmove = onMouseMove;
    document.touchend = onMouseUp;

    document.pointerdown = onMouseDown;
    document.pointermove = onMouseMove;
    document.pointerup = onMouseUp;
}



function getCoords(elem) // кроме IE8-
{
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}


export default AddDragAndDropEvent;

