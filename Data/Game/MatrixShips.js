"use strict";

import {createFirstGameScene, createSecoundGameScene} from "./CreateGame.js"; // нужна только create_game2

function getMatrixShips () {
    let count_ships = 0;
    let matrix_ships = [];
    let field = document.getElementsByClassName("field");
    for (let i = 0; i<field.length; i++) {
        if (field[i].classList.contains("ship")) {
            matrix_ships[i] = 1;
            count_ships++;
        }
        else {
            matrix_ships[i] = 0;
        }
    }
    if (count_ships == 20) {
        let all_game = document.getElementsByClassName("all_game");
        document.body.removeChild(all_game[0]);
        createSecoundGameScene(matrix_ships);
        // вызов функции из другого модуля, в которой отрисовываются поля для игры (верстка второй части)
        // и делается видимой статические части страницы (matrix_ships передаем)
    }
    else {
        alert("Вы не расставили все корабли");
    }
};

export default getMatrixShips;
