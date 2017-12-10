import {WinScene, LoseScene} from "./GameSceneWinLose.js"
import SecondGameScene from "./GameSceneSecond.js";

/*
  [ TO DO - переписать логику выстрелов  (уничтодения кораблей) c матрицы на ShipList ]
  А можно оставить так же на матрицах, хз что лучше (на матрицах не так запутанно)
*/

// 0 - путое поле, (1-10) - корабль не поврежден, 100 - промах, -(1-10) - корабль поврежден

export default class GameLogicFront
{
    constructor()
    {
        if (GameLogicFront.__instance) {
            return GameLogicFront.__instance;
        }

        GameLogicFront.__instance = this;

        this.enemyMatrix = [1, 0, 0, 0, 6, 6, 0, 0, 7, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 7, 0,
                            0, 0, 0, 5, 5, 0, 0, 0, 0, 0,
                            3, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 0, 0, 0, 2, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 9, 9, 9,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.countMyShip = 20;
        this.countEnemyShip = 20;
    }

    newGameLogic (matrixShips)
    {
        this.enemyMatrix = [1, 0, 0, 0, 6, 6, 0, 0, 7, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 7, 0,
                            0, 0, 0, 5, 5, 0, 0, 0, 0, 0,
                            3, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 0, 0, 0, 2, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 0, 0, 0,
                            0, 10, 0, 0, 8, 0, 0, 9, 9, 9,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.matrixShips = matrixShips;

        this.countMyShip = 20;
        this.countEnemyShip = 20;
    }

    shot (field)
    {
        if (this.myFire(field))
        {
            this.botFire();
        }
        if (!(this.countEnemyShip)) {
            let secondGameScene = new SecondGameScene();
            secondGameScene.hide();
            let winScene = new WinScene();
            winScene.show();
        }
        if (!(this.countMyShip)) {
            let secondGameScene = new SecondGameScene();
            secondGameScene.hide();
            let loseScene = new LoseScene();
            loseScene.show();
        }
    }


    myFire(fieldFire)
    {
        let i = +fieldFire.id[0];
        let j = +fieldFire.id[2];

        if (this.enemyMatrix[10*i+j] < 0 || this.enemyMatrix[10*i+j] == 100) {
            return false;
        }
        else if (this.enemyMatrix[10*i+j]) { // попал
            fieldFire.classList.add("shipFire");
            this.enemyMatrix[10*i+j] = -(this.enemyMatrix[10*i+j]);

            // Если убил
            if (this.killShip(-(this.enemyMatrix[10*i+j]), this.enemyMatrix)) {
                for (let k = 0; k < 10; k++) {
                    for (let z = 0; z < 10; z++) {
                        if (this.enemyMatrix[10*k+z] == this.enemyMatrix[10*i+j]) {
                            let fieldDie = document.getElementById(k + "-" + z);
                            fieldDie.classList.remove("shipFire");
                            fieldDie.classList.add("shipDie");
                        }
                    }
                }
            }

            (this.countEnemyShip)--;

            return false;
        }
        else { // промах
            this.enemyMatrix[10*i+j] = 100;
            fieldFire.classList.add("Fire");
            return true;
        }

    }

    botFire()
    {
        let iRand = Math.floor(Math.random() * (9 + 1));
        let jRand = Math.floor(Math.random() * (9 + 1));

        if (this.matrixShips[10*iRand+jRand] < 0 || this.matrixShips[10*iRand+jRand] == 100)
        {
            this.botFire();
        }

        else if (this.matrixShips[10*iRand+jRand]) { // попал

            let el = document.getElementById(iRand + "+" + jRand);
            el.classList.remove("shipOK");
            el.classList.add("shipFire");
            this.matrixShips[10*iRand+jRand] = -(this.matrixShips[10*iRand+jRand])

            // Если убил
            if (this.killShip(-this.matrixShips[10*iRand+jRand], this.matrixShips)) {
                for (let k = 0; k < 10; k++) {
                    for (let z = 0; z < 10; z++) {
                        if (this.matrixShips[10*k+z] == this.matrixShips[10*iRand+jRand]) {
                            let fieldDie = document.getElementById(k + "+" + z);
                            fieldDie.classList.remove("shipFire");
                            fieldDie.classList.add("shipDie");
                        }
                    }
                }
            }

            this.countMyShip--;
            this.botFire();
        }
        else {
            this.matrixShips[10*iRand+jRand] = 100;
            let el = document.getElementById(iRand + "+" + jRand);
            el.classList.add("Fire");
        }
    }

    killShip (num, matrix)
    {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i] == num) {
                return false;
            }
        }
        return true;
    }
}

