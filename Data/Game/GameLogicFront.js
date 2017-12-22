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

        this.turn = 1;

        let gameScene = new SecondGameScene();
        gameScene.turn("Your turn");
    }

    shot (field)
    {
        let gameScene = new SecondGameScene();
        if (this.turn) {
            if (this.myFire(field))
            {
                gameScene.turn("Opponent's turn");
                this.turn = 0;
                setTimeout(function () {
                    this.botFire();
                    gameScene.turn("Your turn");
                    this.turn = 1;
                }.bind(this), 1200);
            }
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
            this.enemyMatrix[10*i+j] = -(this.enemyMatrix[10*i+j]);

            fieldFire.classList.add("shipFire_animation");
            setTimeout(function () {
                fieldFire.classList.remove("shipFire_animation");
                fieldFire.classList.add("shipFire");
            }.bind(fieldFire), 1000);

            // Если убил
            if (this.killShip(-(this.enemyMatrix[10*i+j]), this.enemyMatrix)) {
                for (let k = 0; k < 10; k++) {
                    for (let z = 0; z < 10; z++) {
                        if (this.enemyMatrix[10*k+z] == this.enemyMatrix[10*i+j]) {
                            let fieldDie = document.getElementById(k + "-" + z);
                            fieldDie.classList.remove("shipFire_animation");
                            fieldDie.classList.remove("shipFire");
                            fieldDie.classList.add("shipDie_animation");
                            setTimeout(function () {
                                fieldDie.classList.remove("shipDie_animation");
                                fieldDie.classList.remove("shipFire_animation");
                                fieldDie.classList.remove("shipFire");
                                fieldDie.classList.add("shipDie");
                            }.bind(fieldDie), 1000);


                            // TO DO - можно переделать красиво (без кучи if)
                            // закраска вокруг убитого
                            for (let q = -10; q < 20; q+=10) {
                                for (let t = -1; t < 2; t++) {
                                    if (k + (q/10) < 0 || k + (q/10) > 9 || (z+t) > 9 || (z+t) < 0) {
                                        continue;
                                    }
                                    if (this.enemyMatrix[(10*k+q)+z+t] < 0) {
                                        continue;
                                    }
                                    this.enemyMatrix[(10*k+q)+z+t] = 100;
                                    let field = document.getElementById((k + (q/10)) + "-" + (z+t));
                                    debugger;
                                    field.classList.remove("Fire");
                                    field.classList.add("fieldFire_animation");
                                    setTimeout(function () {
                                        field.classList.remove("fieldFire_animation");
                                        field.classList.add("Fire");
                                    }.bind(field), 1000);
                                }
                            }
                        }
                    }
                }
            }

            (this.countEnemyShip)--;

            return false;
        }
        else { // промах
            this.enemyMatrix[10*i+j] = 100;
            fieldFire.classList.add("fieldFire_animation");
            setTimeout(function () {
                fieldFire.classList.remove("fieldFire_animation");
                fieldFire.classList.add("Fire");
            }.bind(fieldFire), 1000);
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
            el.classList.add("shipFire_animation");
            setTimeout(function () {
                el.classList.remove("shipFire_animation");
                el.classList.add("shipFire");
            }.bind(el), 1000);
            this.matrixShips[10*iRand+jRand] = -(this.matrixShips[10*iRand+jRand])

            // Если убил
            if (this.killShip(-this.matrixShips[10*iRand+jRand], this.matrixShips)) {
                for (let k = 0; k < 10; k++) {
                    for (let z = 0; z < 10; z++) {
                        if (this.matrixShips[10*k+z] == this.matrixShips[10*iRand+jRand]) {
                            let fieldDie = document.getElementById(k + "+" + z);
                            fieldDie.classList.remove("shipFire_animation");
                            fieldDie.classList.remove("shipFire");
                            fieldDie.classList.add("shipDie_animation");
                            setTimeout(function () {
                                fieldDie.classList.remove("shipFire_animation");
                                fieldDie.classList.remove("shipFire");
                                fieldDie.classList.remove("shipDie_animation");
                                fieldDie.classList.add("shipDie");
                            }.bind(fieldDie), 1000);

                            // TO DO - можно переделать красиво (без кучи if)
                            // закраска вокруг убитого
                            for (let q = -10; q < 20; q+=10) {
                                for (let t = -1; t < 2; t++) {
                                    if (k + (q/10) < 0 || k + (q/10) > 9 || (z+t) > 10 || (z+t) < 0) {
                                        continue;
                                    }
                                    if (this.matrixShips[(10*k+q)+z+t] < 0) {
                                        continue;
                                    }
                                    this.matrixShips[(10*k+q)+z+t] = 100;
                                    let field = document.getElementById((k + (q/10)) + "+" + (z+t));
                                    field.classList.remove("Fire");
                                    field.classList.add("fieldFire_animation");
                                    setTimeout(function () {
                                        field.classList.remove("fieldFire_animation");
                                        field.classList.add("Fire");
                                    }.bind(field), 1000);
                                }
                            }
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
            el.classList.add("fieldFire_animation");
            setTimeout(function () {
                el.classList.remove("fieldFire_animation");
                el.classList.add("Fire");
            }.bind(el), 1000);
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

