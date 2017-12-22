import GameScene from "./GameScene.js";
import Widget from "../Modules/Blocks/Widget.js";
import GameLogicFront from "./GameLogicFront.js";
import GameController from "./GameManager.js"
import GameLogic from "./GameLogic.js";
import {BackMenu} from "./GameSceneWinLose.js"

/*
   TO DO - в GameScene
*/

export default class SecondGameScene extends GameScene
{
    show(matrixShips, move = 0)
    {
        let gameController = new GameController();

        if (gameController.getGame()) {
            let gameLogic = new GameLogic(move);
            gameLogic.changeMove(move);
            gameLogic.messageOnGameLogic();
        }
        else {
            let gameLogicFront = new GameLogicFront();
            gameLogicFront.newGameLogic(matrixShips);
        }

        let all_game = new Widget(document.body,"div", "all_game");

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.element.classList.add("flatLightGray");
        backButton.text = "Back to Menu";
        backButton.element.addEventListener('click', () => {BackMenu();});
        all_game.appendChildWidget(backButton);

        let text = new Widget(document.body, "h1", "inline_block h1_my");
        text.text = gameController.getUserName();
        all_game.appendChildWidget(text);

        text = new Widget(document.body, "h1", "inline_block h1_enemy");
        text.text = gameController.getEmemyName();
        all_game.appendChildWidget(text);

        this.createField(all_game, matrixShips);

        this.createField(all_game, matrixShips, 1);
    }

    createField(all_game, matrixShips, flag = 0)
    {
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
                        let td_field = new Widget(document.body, "td", "table_field_td");
                        if (matrixShips[10*(i-1)+(j-1)] && flag) {
                            td_field.element.classList.add("shipOK");
                        }
                        tr_field.appendChildWidget(td_field);
                        if (flag) {
                            td_field.element.id = (i-1) + "+" + (j-1);
                        }
                        else {
                            td_field.addEventHandler("click", () => {
                                let gameContoller = new GameController();
                                if (gameContoller.getGame()) {
                                    let gameLogic = new GameLogic();
                                    gameLogic.shot(td_field.element);
                                }
                                else
                                {
                                    let gameLogicFront = new GameLogicFront();
                                    gameLogicFront.shot(td_field.element);
                                }
                            });
                            td_field.element.id = (i-1) + "-" + (j-1);
                        }
                    }
                }
            }
        }
    }

    turn(turn)
    {
        let elem = document.getElementsByClassName("h1_turn");
        if (elem[0]) {
            document.body.removeChild(elem[0]);
        }
        elem = new Widget(document.body, "h1", "inline_block h1_turn");
        elem.text = turn;
        if(turn[0] == "Y") {
            elem.element.classList.add("h1_turn_my");
        }
        else {
            elem.element.classList.add("h1_turn_enemy");
        }
    }
}
