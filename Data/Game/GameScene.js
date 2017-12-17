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
        let elem = document.getElementsByClassName("all_game");
        if (elem[0]) {
            document.body.removeChild(elem[0]);
        }
        elem = document.getElementsByClassName("h1_turn");
        if (elem[0]) {
            document.body.removeChild(elem[0]);
        }
        elem = null;
    }
}
