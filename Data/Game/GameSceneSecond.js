import GameScene from "./GameScene.js";
import Widget from "../Modules/Blocks/Widget.js";
import GameLogicFront from "./GameLogicFront.js";

/*
   TO DO - в GameScene
*/

export default class FirstGameScene extends GameScene
{
    show(matrix_ships)
    {
        let all_game = new Widget(document.body,"div", "all_game");

        let text = new Widget(document.body, "h1", "inline_block h1_my");
        text.text = "Username";
        all_game.appendChildWidget(text);
        text = new Widget(document.body, "h1", "inline_block h1_enemy");
        text.text = "Противник";
        all_game.appendChildWidget(text);

        this.createField(all_game, matrix_ships);

        let gameLogicFront = new GameLogicFront();
        gameLogicFront.newGameLogic();

        this.createField(all_game, matrix_ships, 1);
    }

    createField(all_game, matrix_ships, flag = 0)
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
                            td_field.addEventHandler("click", () => {
                                let gameLogicFront = new GameLogicFront();
                                gameLogicFront.shot(td_field.element, matrix_ships);
                            });
                            td_field.element.id = (i-1) + "-" + (j-1);
                        }
                    }
                }
            }
        }
    }
}
