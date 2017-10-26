import {WinScene, LoseScene} from "./WinLoseScene.js"

// Логика игры с ботом без интернета
let enemy_matrix = [0,1,1,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,1,1,0,0,0,0,
                    1,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,
                    0,0,1,0,0,0,0,0,1,0,
                    0,0,1,0,1,1,1,0,1,0,
                    0,0,1,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,1,0,
                    1,0,0,0,0,1,0,0,0,0];

let countMyShip = 20;
let countEnemyShip = 20;

// 0 - путое поле, 1 - корабль не поврежден, 2 - промах, [3 - попал,] 4 - убил
function gameLogic (field, matrix_ships)
{
    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0; j < 10; j++) {
    //         if (enemy_matrix[10*i + j]) {
    //             let el = document.getElementById(i + "-" + j);
    //             el.classList.add("shipDie");
    //         }
    //     }
    // }
    if (myFire(field))
    {
        botFire(matrix_ships);
    }
    if (!countEnemyShip) {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
        WinScene();
    }
    if (!countMyShip) {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
        LoseScene();
    }
};


function myFire(field) {
    if (field.classList.contains("shipDie") || field.classList.contains("shipFire") ||
        field.classList.contains("Fire"))
    {
        return false;
    }

    let i = +field.id[0];
    let j = +field.id[2];
    if (enemy_matrix[10*i+j]) {
        enemy_matrix[10*i+j] = 4; // [3]
        field.classList.add("shipDie");
        countEnemyShip--;
        return false;
    }
    else {
        enemy_matrix[10*i+j] = 2;
        field.classList.add("Fire");
        return true;
    }

    if (!count_ship) {
        return false;
    }
};

function botFire(matrix_ships) {
    let iRand = Math.floor(Math.random() * (9 + 1));
    let jRand = Math.floor(Math.random() * (9 + 1));

    if (matrix_ships[10*iRand+jRand] > 1) {
        botFire(matrix_ships);
    }
    else if (matrix_ships[10*iRand+jRand]) {
        matrix_ships[10*iRand+jRand] = 4; // [3]
        let el = document.getElementById(iRand + "+" + jRand);
        el.classList.remove("shipOK");
        el.classList.add("shipDie");
        countMyShip--;
        botFire(matrix_ships);
    }
    else {
        matrix_ships[10*iRand+jRand] = 2;
        let el = document.getElementById(iRand + "+" + jRand);
        el.classList.add("Fire");
    }
};

export default gameLogic;
