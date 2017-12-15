// Все комментарии для GameScene (1 и 2)
// Кнопки [перезагрузки поля], чтобы поле и кнопки не бегали вверх/вниз, фон за полем
// убрать _
// Добавить кнопку назад в меню [прекратить игру]


export default class GameScene
{
    constructor() {}

    show() {}

    hide()
    {
        let allGame = document.getElementsByClassName("all_game");
        if (allGame[0]) {
            document.body.removeChild(allGame[0]);
        }
        allGame = null;
    }
}
