import Widget from "../Modules/Blocks/Widget.js";
import EventBus from "../Modules/EventBus.js";

const eventBus = new EventBus();

class WinScene
{
    constructor ()
    {
        this.show();
    }

    show()
    {
        let AllGame = new Widget(document.body,"div", "all_game");

        let text = new Widget(document.body, "h1", "youWinLose");
        text.text = "You Win!";
        AllGame.appendChildWidget(text);

        text = new Widget(document.body, "h1", "newScore");
        text.text = "Score: " + "40" + " +0"; // 40 - счет игрока
        AllGame.appendChildWidget(text);
        // +0 так как игра с ботом

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.text = "Back to Menu";
        AllGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', BackMenu);
        backButton.element.classList.add("flatLightGray");
    }

    hide()
    {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
    }
}

class LoseScene
{
    constructor ()
    {
        this.show();
    }

    show() {
        let AllGame = new Widget(document.body, "div", "all_game");

        let text = new Widget(document.body, "h1", "youWinLose");
        text.text = "You Lose!";
        AllGame.appendChildWidget(text);

        text = new Widget(document.body, "h1", "newScore");
        text.text = "Score: " + "40" + " -0"; // 40 - счет игрока
        AllGame.appendChildWidget(text);
        // -0 так как игра с ботом

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.text = "Back to Menu";
        AllGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', BackMenu);
        backButton.element.classList.add("flatLightGray");
    }

    hide()
    {
        let AllGame = document.getElementsByClassName("all_game");
        document.body.removeChild(AllGame[0]);
    }
}

// Пока оставлю, для перехода в меню, хз зачем нужно
function BackMenu() {
    let AllGame = document.getElementsByClassName("all_game");
    document.body.removeChild(AllGame[0]);
    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
}

export {WinScene, LoseScene, BackMenu};
