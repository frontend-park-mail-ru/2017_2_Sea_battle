import Widget from "../Modules/Blocks/Widget.js";
import EventBus from "../Modules/EventBus.js";
import GameScene from "./GameScene.js";
import GameController from "./GameManager.js";
import WebSocketManager from "./WebSocket.js";

const eventBus = new EventBus();

class WinScene extends GameScene
{
    show()
    {
        let AllGame = new Widget(document.body,"div", "all_game");

        let text = new Widget(document.body, "h1", "youWinLose");
        text.text = "You Win!";
        AllGame.appendChildWidget(text);

        let gameController = new GameController();
        if (gameController.getGame()){
            text = new Widget(document.body, "h1", "newScore");
            text.text = "Score: " + gameController.getScore();
            AllGame.appendChildWidget(text);
        }

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.text = "Back to Menu";
        AllGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', () => {BackMenu();});
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
        text.text = "Score: " + "40";
        AllGame.appendChildWidget(text);

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.text = "Back to Menu";
        AllGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', () => {BackMenu();});
        backButton.element.classList.add("flatLightGray");
    }

}


function BackMenu() {
    let gameScene = new GameScene();
    gameScene.hide();
    let webSocket = new WebSocketManager();
    webSocket.closeSocket();
    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
}

export {WinScene, LoseScene, BackMenu};
