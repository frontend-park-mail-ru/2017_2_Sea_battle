import Widget from "../Modules/Blocks/Widget.js";
import EventBus from "../Modules/EventBus.js";
import GameScene from "./GameScene.js";

const eventBus = new EventBus();

class WinScene extends GameScene
{
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
        backButton.element.addEventListener('click', () => {
            BackMenu();
            /*
            let winScene = new WinScene();
            winScene.hide();
            eventBus.emitEvent({type: "changeMenu", newMenuName: "/"}); // ?
            */
        });
        backButton.element.classList.add("flatLightGray");
    }

}

class LoseScene extends GameScene
{
    show() {
        let AllGame = new Widget(document.body, "div", "all_game");

        let text = new Widget(document.body, "h1", "youWinLose");
        text.text = "You Lose!";
        AllGame.appendChildWidget(text);

        text = new Widget(document.body, "h1", "newScore");
        text.text = "Score: " + "40" + " -0"; // 40 - счет игрока
        AllGame.appendChildWidget(text);
        // -0 так как игра с ботом

        let backButton = new Widget(document.body, "button", "backButton backButtonWinLose");
        backButton.text = "Back to Menu";
        AllGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', () => {
            BackMenu();
            /*
            let loseScene = new LoseScene();
            loseScene.hide();
            eventBus.emitEvent({type: "changeMenu", newMenuName: "/"}); // ?
            */
        });
        backButton.element.classList.add("flatLightGray");
    }

}


// Или перенести в отдельный файл или просто прописывать все вручную, если разные параметры EventBus
function BackMenu() {
    let gameScene = new GameScene();
    gameScene.hide();
    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
}

export {WinScene, LoseScene, BackMenu};
