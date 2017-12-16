import GameScene from "./GameScene.js";
import Widget from "../Modules/Blocks/Widget.js";
import AddDragAndDropEvent from "./DragAndDrop.js";
import {getMatrixShips, getRandomMatrixShips} from "./MatrixShips.js";
import ShipList from "./ShipList.js";
import Ship from "./Ship.js";
import TurnManager from "./TurnManager.js";
import {BackMenu} from "./GameSceneWinLose.js"

/*
   TO DO - в GameScene
*/

export default class FirstGameScene extends GameScene
{
    show()
    {
        let all_game = new Widget(document.body, "div", "all_game");

        let text = new Widget(document.body, "h1", "placeShips");
        text.text = "Place your ships";
        all_game.appendChildWidget(text);

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.element.classList.add("flatLightGray");
        backButton.text = "Back to Menu";
        backButton.element.addEventListener('click', () => {BackMenu();});
        all_game.appendChildWidget(backButton);

        let turnButton = new Widget(document.body, "button", "turnButton");
        turnButton.element.classList.add("flatLightGray");
        turnButton.text = "Turn ships";
        all_game.appendChildWidget(turnButton);
        let turnManager = new TurnManager();
        turnManager.clearFlag();
        turnButton.element.addEventListener('click', () => {turnManager.turnShips();});

        // Добавляем корабли
        let shipField = new Widget(document.body,"div", "shipField");
        all_game.appendChildWidget(shipField);
        let shipCount = 1;
        let shipNum = 1;
        let shipList = new ShipList();
        shipList.clearList();
        for (let i = 4; i > 0; i--) {
            let space = new Widget();
            shipField.appendChildWidget(space);
            for (let j = i; j > 0; j--){
                shipList.setShip(new Ship(shipField, shipNum, shipCount), shipNum - 1);
                shipNum++;
            }
            shipCount++;
        }

        // Добавляем фон за полем
        //let img_field = new Widget(document.body, "img", "img_field");
        //all_game.appendChildWidget(img_field);

        // Добавляем поле для расстановки
        let tableField = new Widget(document.body, "table", "table_field");
        all_game.appendChildWidget(tableField);
        let arr_letters = [' ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
        for (let i = 0; i < 11; i++) {
            let tr_field = new Widget(document.body, "tr");
            tableField.appendChildWidget(tr_field);
            for (let j = 0; j < 11; j++) {
                if (i==0) {
                    let td_field = new Widget(document.body, "td", "table_field_td");
                    td_field.text = arr_letters[j];
                    tr_field.appendChildWidget(td_field);
                }
                else {
                    if (j==0){
                        let td_field = new Widget(document.body, "td", "table_field_td");
                        td_field.text = i;
                        tr_field.appendChildWidget(td_field);
                    }
                    else {
                        let td_field = new Widget(document.body, "td", "droppable field table_field_td");
                        td_field.idName = (i-1) + " " + (j-1);
                        tr_field.appendChildWidget(td_field);
                    }
                }
            }
        }
        let space = new Widget();
        all_game.appendChildWidget(space);

        let randShips = new Widget(document.body, "button", "randomShips");
        randShips.text = "Random ships";
        randShips.element.classList.add("flatLightGray");
        randShips.element.addEventListener('click', () => {getRandomMatrixShips()});
        all_game.appendChildWidget(randShips);

        let nextButton = new Widget(document.body, "button", "next_button");
        nextButton.text = "Next";
        nextButton.element.classList.add("flatLightGray");
        all_game.appendChildWidget(nextButton);
        nextButton.element.addEventListener('click', () => {getMatrixShips()});

        AddDragAndDropEvent();
    }
}
