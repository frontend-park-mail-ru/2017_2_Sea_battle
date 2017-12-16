import GameScene from "./GameScene.js";
import Widget from "../Modules/Blocks/Widget.js";
import {BackMenu} from "./GameSceneWinLose.js"



export default class GameLoader extends GameScene {
    show() {
        let allGame = new Widget(document.body, "div", "all_game");
        let body = new Widget(document.body, "div", "body_launcher");
        let loaderHTML = "<main role=\"main\">\n" +
            "    <ul role=\"progressbar\" aria-busy=\"true\">\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "        <li role=\"presentation\"></li>\n" +
            "    </ul>\n" +
            "    <p align=\"middle\" class=\"p_p\">\n" +
            "        <span id=\"title\">Waiting for the enemy...</span>\n" +
            "    </p>\n" +
            "</main>";
        body.element.innerHTML = loaderHTML;
        allGame.appendChildWidget(body);

        let backButton = new Widget(document.body, "button", "backButton");
        backButton.text = "Back to Menu";
        allGame.appendChildWidget(backButton);
        backButton.element.addEventListener('click', () => {BackMenu();});
        backButton.element.classList.add("flatLightGray");
    }
}

/*
    Source: https://codepen.io/Michiel/pen/xbJdLJ
    Thanks :)
*/
