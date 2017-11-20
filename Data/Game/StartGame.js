"use strict";


import FirstGameScene from "./GameSceneFirst.js";


// Все комментарии для GameScene (1 и 2)
// Кнопки [перезагрузки поля], чтобы поле и кнопки не бегали вверх/вниз, фон за полем
// убрать _
// Добавить кнопку назад в меню [прекратить игру]


function startGame() {
    let firstScene = new FirstGameScene();
    firstScene.show();
}

export default startGame
