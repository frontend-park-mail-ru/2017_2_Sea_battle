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
        let AllGame = document.getElementsByClassName("all_game");
        // TO DO - костыль, при выходе всегда пытается удалить all_game, даже если его нет
        if (AllGame[0]) {
            document.body.removeChild(AllGame[0]);
        }
        AllGame = null;
        //document.body.removeChild(AllGame[0]);
    }
}
