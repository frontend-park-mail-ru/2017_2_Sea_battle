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


// ставим метки для корабля или сам корабль
function field_Lighting(event, flag_turn, ship = 0) {
    let count = 0; // к-во возможных клеток для корабля (красные поля)
    let x = 0;
    let y = 0;
    let elem;
    let el;
    // подсчитуем к-во свободных клеток
    for (let i = 0; i < num_ship; i++){
        // спрячем переносимый элемент
        dragObject.avatar.hidden = true;
        // получить самый вложенный элемент по координатам
        if (flag_turn == 0) {
            x = event.clientX + i * 35;
            y = event.clientY;
        }
        else {
            x = event.clientX;
            y = event.clientY + i * 35;
        }

        elem = document.elementFromPoint(x, y);

        // показать переносимый элемент обратно
        dragObject.avatar.hidden = false;

        if (elem == null) {

            // такое возможно, если курсор мыши "вылетел" за границу окна
            return;
        }

        // возвращает элемент класса droppable по координатам
        el = elem.closest('.droppable');
        if (el == null) {
            break;
        }
        count++;

    }

    // Можем поставить корабль (к-во незанятых клеток равно размеру корабля)
    if (num_ship == count) {
        for (let i = 0; i < count; i++){
            dragObject.avatar.hidden = true;

            if (flag_turn == 0) {
                x = event.clientX + i * 35;
                y = event.clientY;
            }
            else {
                x = event.clientX;
                y = event.clientY + i * 32; // 35 не работает на 2 и 4
            }

            elem = document.elementFromPoint(x, y);

            dragObject.avatar.hidden = false;

            el = elem.closest('.droppable');

            if (ship == 0) {
                // метка - можем поставить сюда корабль
                el.style.cssText = "background-color: red;";
            }
            else{
                // ставим корабль на метку
                el.style.cssText = "background-color: greenyellow;";
                el.classList.add("ship");
                el.classList.remove("droppable");
                // удаление клеток вокруг корабля
                let num = 3;
                if (count == 1){
                    num = 2;
                }
                if (count == 3){
                    num = 4
                }
                if (count == 4){
                    num = 5
                }
                // верх и лево
                for (let k = -1; k < num; k++) {
                    if (flag_turn == 0) {
                        x = event.clientX + 34*k;
                        y = event.clientY - 32;
                    }
                    else {
                        x = event.clientX - 35;
                        y = event.clientY + 32*k;
                    }
                    elem = document.elementFromPoint(x, y);
                    if (elem) {
                        el = elem.closest('.droppable');
                        if (el) {
                            el.classList.remove("droppable");
                            el.style.cssText = "background-color: yellow;";
                        }
                    }
                }
                // низ и право
                for (let k = -1; k < num; k++) {
                    if (flag_turn == 0) {
                        x = event.clientX + 34*k;
                        y = event.clientY + 32;
                    }
                    else {
                        x = event.clientX + 33;
                        y = event.clientY + 32*k;
                    }

                    elem = document.elementFromPoint(x, y);
                    if (elem) {
                        el = elem.closest('.droppable');
                        if (el) {
                            el.classList.remove("droppable");
                            el.style.cssText = "background-color: yellow;";
                        }
                    }
                }
                if (i == 0) {
                    if (flag_turn == 0) {
                        x = event.clientX - 35;
                        y = event.clientY;
                    }
                    else {
                        x = event.clientX;
                        y = event.clientY - 32;
                    }

                    elem = document.elementFromPoint(x, y);
                    if (elem) {
                        el = elem.closest('.droppable');
                        if (el) {
                            el.classList.remove("droppable");
                            el.style.cssText = "background-color: yellow;";
                        }
                    }
                }
                if (i == num_ship-1) {
                    if (flag_turn == 0) {
                        x = event.clientX + 34*(i+1);
                        y = event.clientY;
                    }
                    else {
                        x = event.clientX;
                        y = event.clientY + 32*(i+1);
                    }

                    elem = document.elementFromPoint(x, y);
                    if (elem) {
                        el = elem.closest('.droppable');
                        if (el) {
                            el.classList.remove("droppable");
                            el.style.cssText = "background-color: yellow;";
                        }
                    }
                }
            }

        }
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

