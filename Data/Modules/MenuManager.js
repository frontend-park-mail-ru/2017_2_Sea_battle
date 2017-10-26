"use strict";

import Subscriber from "./Subscriber.js";
import mainMenuView from "./Views/MainMenuView/MainMenuView.js";
import aboutMenuView from "./Views/AboutMenuView/AboutMenuView.js";
import leaderboardView from "./Views/LeaderboardView/LeaderboardView.js";
import startGameMenuView from "./Views/StartGameMenuView/StartGameMenuView.js";
import gameModeMenuView from "./Views/GameModeMenuView/GameModeMenuView.js";
import loginMenuView from "./Views/LoginMenuView/LoginMenuView.js";
import registerMenuView from "./Views/RegisterMenuView/RegisterMenuView.js";
import MainMenuController from "./Controllers/MainMenuController.js";
import AboutMenuController from "./Controllers/AboutMenuController.js";
import LeaderboardController from "./Controllers/LeaderboardController.js";
import StartGameMenuController from "./Controllers/StartGameMenuController.js";
import GameModeMenuController from "./Controllers/GameModeMenuController.js";
import LoginMenuController from "./Controllers/LoginMenuController.js";
import RegisterMenuController from "./Controllers/RegisterMenuController.js";

class MenuManager extends Subscriber
{
    constructor()
    {
        if(MenuManager.instance)
            return MenuManager.instance;

        super();
        this.menus =
            {
                "/": new MainMenuController(mainMenuView),
                "/leaderboardMenu": new LeaderboardController(leaderboardView),
                "/aboutMenu": new AboutMenuController(aboutMenuView),
                "/startGame": new StartGameMenuController(startGameMenuView),
                "/selectMode": new GameModeMenuController(gameModeMenuView),
                "/startGame/login": new LoginMenuController(loginMenuView),
                "/startGame/register": new RegisterMenuController(registerMenuView),
            };

        this.currentMenu = this.menus["/"];
        this.currentMenu.show();

        MenuManager.instance = this;
    }

    changeMenu(newMenuURL, bPushState = true)
    {
        this.currentMenu.hide();
        this.currentMenu = this.menus[newMenuURL];
        if(bPushState === true)
            window.history.pushState(null, this.currentMenu.title, this.currentMenu.url);
        this.currentMenu.show();
    }

    go()
    {
        this.changeMenu(window.location.pathname, false);
    }


    eventFired(event)
    {
        if(event.type === "changeMenu")
            this.changeMenu(event.newMenuName);
        else if(event.type === "goBack")
            window.history.back();

    }

    registerMenu(URL, controller)
    {
        this.menus[URL] = controller;
    }

}

export default MenuManager;
