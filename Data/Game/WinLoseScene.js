import Widget from "../Modules/Blocks/Widget.js";
import EventBus from "../Modules/EventBus.js";

const eventBus = new EventBus();

function BackButton(AllGame) {
    let backButton = new Widget(document.body, "button", "backButton");
    backButton.text = "Back to Menu";
    AllGame.appendChildWidget(backButton);
    backButton.element.addEventListener('click', BackMenu);
    backButton.element.classList.add("flatLightGray");
}

function BackMenu() {
    let AllGame = document.getElementsByClassName("all_game");
    document.body.removeChild(AllGame[0]);
    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
}

function WinScene() {
    let AllGame = new Widget(document.body,"div", "all_game");

    let text = new Widget(document.body, "h1", "youWinLose");
    text.text = "You Win!";
    AllGame.appendChildWidget(text);

    text = new Widget(document.body, "h1", "newScore");
    text.text = "Score: " + "40" + " +0"; // 40 - счет игрока
    AllGame.appendChildWidget(text);
    // +0 так как игра с ботом

    BackButton(AllGame);

}

function LoseScene() {
    let AllGame = new Widget(document.body,"div", "all_game");

    let text = new Widget(document.body, "h1", "youWinLose");
    text.text = "You Lose!";
    AllGame.appendChildWidget(text);

    text = new Widget(document.body, "h1", "newScore");
    text.text = "Score: " + "40" + " -0"; // 40 - счет игрока
    AllGame.appendChildWidget(text);
    // -0 так как игра с ботом

    BackButton(AllGame);
}

export {WinScene, LoseScene, BackMenu};
