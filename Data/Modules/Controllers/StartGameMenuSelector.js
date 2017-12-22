"use strict";

import StartGameMenuController from "./StartGameMenuController.js";
import startGameMenuView from "../Views/StartGameMenuView/StartGameMenuView.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";

import EventBus from "../EventBus.js";

class StartGameMenuSelector
{
    constructor()
    {
        this.startGameMenuController = new StartGameMenuController(startGameMenuView);
        this.url = "/startGame";
        this.title = "Start Game";
    }

    show()
    {
        Services.getUser()
            .then(response =>
        {
            if(response.status === 0)
                this.startGameMenuController.show();
            else
            {
                let eventBus = new EventBus();
                eventBus.emitEvent({type: "changeMenu", newMenuName: "/selectMode"});
            }
        })
            .catch(() =>
        {
            let eventBus = new EventBus();
            eventBus.emitEvent({type: "changeMenu", newMenuName: "/startGame/offline"});
            new MessageBox("Offline", "You have gone offline; Standalone game against bot");
        });
    }

    hide()
    {
        this.startGameMenuController.hide();
        /*
        Services.getUser()
            .then(response =>
            {
                if(response.status === 0)
                    this.startGameMenuController.hide();
            })
            .catch(exit =>
            {
            });
        */
    }

}

export default StartGameMenuSelector;
