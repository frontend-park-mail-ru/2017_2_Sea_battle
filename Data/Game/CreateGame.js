"use strict";

import Widget from "../Modules/Blocks/Widget.js";
import {AddMouseEvent, TurnShips} from "./ArrangementShip.js";
import getMatrixShips from "./MatrixShips.js";
import gameLogic from "./GameLogic.js";
import ShipList from "./ShipList.js";
import Ship from "./Ship.js";


// Кнопки [перезагрузки поля], чтобы поле и кнопки не бегали вверх/вниз, фон за полем
// убрать _
// Добавить кнопку назад в меню [прекратить игру]

 /*
    TO DO - Добавить класс Scene где будут show (собрать) и hide (удалить) и от него унаследовать все сцены
    [ будут создаваться объеты сцен и удалятсья при переходе ]
 */

function createFirstGameScene() {
    let all_game = new Widget(document.body,"div", "all_game");

    let text = new Widget(document.body, "h1");
    text.text = "Разместите на поле ваши корабли";
    all_game.appendChildWidget(text);

    let turnButton = new Widget(document.body, "button", "turnButton");
    turnButton.element.classList.add("flatLightGray");
    turnButton.text = "Turn ships";
    all_game.appendChildWidget(turnButton);
    turnButton.element.addEventListener('click', TurnShips);


    // Добавляем корабли
    let shipCount = 1;
    let shipNum = 1;
    let shipList = new ShipList;
    for (let i = 4; i > 0; i--) {
        let space = new Widget();
        all_game.appendChildWidget(space);
        for (let j = i; j > 0; j--){
            shipList.setShip(new Ship(all_game, shipNum, shipCount), shipNum - 1);
            shipNum++;
        }
        shipCount++;
    }

    // Добавляем фон за полем
    //let img_field = new Widget(document.body, "img", "img_field");
    //all_game.appendChildWidget(img_field);

    // Добавляем поле для расстановки
    let table_field = new Widget(document.body, "table", "table_field");
    all_game.appendChildWidget(table_field);
    let arr_letters = [' ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    for (let i = 0; i < 11; i++) {
        let tr_field = new Widget(document.body, "tr");
        table_field.appendChildWidget(tr_field);
        for (let j = 0; j < 11; j++) {
            if (i==0) {
                let td_field = new Widget(document.body, "td");
                td_field.text = arr_letters[j];
                tr_field.appendChildWidget(td_field);
            }
            else {
                if (j==0){
                    let td_field = new Widget(document.body, "td");
                    td_field.text = i;
                    tr_field.appendChildWidget(td_field);
                }
                else {
                    let td_field = new Widget(document.body, "td", "droppable field");
                    td_field.idName = (i-1) + " " + (j-1);
                    tr_field.appendChildWidget(td_field);
                }
            }
        }
    }
    let space = new Widget();
    all_game.appendChildWidget(space);

    let next_button = new Widget(document.body, "button", "next_button");
    next_button.text = "Next";
    next_button.element.classList.add("flatLightGray");
    all_game.appendChildWidget(next_button);
    next_button.element.addEventListener('click', getMatrixShips);

    AddMouseEvent();

    // Перезагрузка поля
    // document.body.removeChild(all_game.element);
    // createFirstGameScreen();


};

function createSecoundGameScene(matrix_ships) {
    let all_game = new Widget(document.body,"div", "all_game");

    let text = new Widget(document.body, "h1", "inline_block h1_my");
    text.text = "Username";
    all_game.appendChildWidget(text);
    text = new Widget(document.body, "h1", "inline_block h1_enemy");
    text.text = "Противник";
    all_game.appendChildWidget(text);

    createField(all_game, matrix_ships);
    createField(all_game, matrix_ships, 1);
}

function createField(all_game, matrix_ships, flag = 0) {
    let table_class = "enemy_field";
    if (flag) {
        table_class = "my_field";
    }
    let table_field = new Widget(document.body, "table", table_class);
    all_game.appendChildWidget(table_field);
    let arr_letters = [' ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    for (let i = 0; i < 11; i++) {
        let tr_field = new Widget(document.body, "tr");
        table_field.appendChildWidget(tr_field);
        for (let j = 0; j < 11; j++) {
            if (i==0) {
                let td_field = new Widget(document.body, "td");
                td_field.text = arr_letters[j];
                tr_field.appendChildWidget(td_field);
            }
            else {
                if (j==0){
                    let td_field = new Widget(document.body, "td");
                    td_field.text = i;
                    tr_field.appendChildWidget(td_field);
                }
                else {
                    let td_field = new Widget(document.body, "td", "field_ship");
                    if (matrix_ships[10*(i-1)+(j-1)] && flag) {
                        td_field.element.classList.add("shipOK");
                    }
                    tr_field.appendChildWidget(td_field);
                    if (flag) {
                        td_field.element.id = (i-1) + "+" + (j-1);
                    }
                    else {
                        td_field.addEventHandler("click", () => {gameLogic(td_field.element, matrix_ships);});
                        td_field.element.id = (i-1) + "-" + (j-1);
                    }
                }
            }
        }
    }
};


export {createFirstGameScene, createSecoundGameScene};
