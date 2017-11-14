import {WinScene, LoseScene} from "./WinLoseScene.js"

// Логика игры с ботом без интернета
let enemyMatrix =  [1, 0, 0, 0, 6, 6, 0, 0, 7, 0,
                     0, 0, 0, 0, 0, 0, 0, 0, 7, 0,
                     0, 0, 0, 5, 5, 0, 0, 0, 0, 0,
                     3, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                     0, 10, 0, 0, 0, 0, 0, 2, 0, 0,
                     0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                     0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                     0, 10, 0, 0, 8, 0, 0, 9, 9, 9,
                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let countMyShip = 20; // не сохраняет = 20
let countEnemyShip = 20; // не сохраняет = 20

 /*
   [ TO DO - переписать логику выстрелов  (уничтодения кораблей) c матрицы на ShipList ]
   А можно оставить так же на матрицах, хз что лучше (на матрицах не так запутанно)
 */

// 0 - путое поле, (1-10) - корабль не поврежден, 100 - промах, -(1-10) - корабль поврежден

function gameLogic (field, matrixShips)
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
        botFire(matrixShips);
    }
    if (!countEnemyShip) {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
        let winScene = new WinScene();
    }
    if (!countMyShip) {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
        let loseScene = new LoseScene();
    }
}


function myFire(fieldFire) {

    let i = +fieldFire.id[0];
    let j = +fieldFire.id[2];

    if (enemyMatrix[10*i+j] < 0 || enemyMatrix[10*i+j] == 100) {
        return false;
    }
    /*
    if (field.classList.contains("shipDie") || field.classList.contains("shipFire") ||
        field.classList.contains("Fire"))
    {
        return false;
    }
     */
    else if (enemyMatrix[10*i+j]) { // попал
        fieldFire.classList.add("shipFire");
        enemyMatrix[10*i+j] = -(enemyMatrix[10*i+j]);

        // Если убил
        if (killShip(-enemyMatrix[10*i+j], enemyMatrix)) {
            for (let k = 0; k < 10; k++) {
                for (let z = 0; z < 10; z++) {
                    if (enemyMatrix[10*k+z] == enemyMatrix[10*i+j]) {
                        let fieldDie = document.getElementById(k + "-" + z);
                        fieldDie.classList.remove("shipFire");
                        fieldDie.classList.add("shipDie");
                    }
                }
            }
        }

        countEnemyShip--;

        return false;
    }
    else { // промах
        enemyMatrix[10*i+j] = 100;
        fieldFire.classList.add("Fire");
        return true;
    }

};

function botFire(matrixShips) {
    let iRand = Math.floor(Math.random() * (9 + 1));
    let jRand = Math.floor(Math.random() * (9 + 1));

    if (matrixShips[10*iRand+jRand] < 0 || matrixShips[10*iRand+jRand] == 100)
    {
        botFire(matrixShips);
    }

    else if (matrixShips[10*iRand+jRand]) { // попал

        let el = document.getElementById(iRand + "+" + jRand);
        el.classList.remove("shipOK");
        el.classList.add("shipFire");
        matrixShips[10*iRand+jRand] = -(matrixShips[10*iRand+jRand])

        // Если убил
        if (killShip(-matrixShips[10*iRand+jRand], matrixShips)) {
            for (let k = 0; k < 10; k++) {
                for (let z = 0; z < 10; z++) {
                    if (matrixShips[10*k+z] == matrixShips[10*iRand+jRand]) {
                        let fieldDie = document.getElementById(k + "+" + z);
                        fieldDie.classList.remove("shipFire");
                        fieldDie.classList.add("shipDie");
                    }
                }
            }
        }

        countMyShip--;
        botFire(matrixShips);
    }
    else {
        matrixShips[10*iRand+jRand] = 100;
        let el = document.getElementById(iRand + "+" + jRand);
        el.classList.add("Fire");
    }
};

function killShip (num, matrix) {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i] == num) {
            return false;
        }
    }
    return true;
}

export default gameLogic;
