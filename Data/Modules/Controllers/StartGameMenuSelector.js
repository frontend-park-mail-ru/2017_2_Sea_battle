"use strict";

import StartGameMenuController from "./StartGameMenuController.js";
import startGameMenuView from "../Views/StartGameMenuView/StartGameMenuView.js";
import Services from "../Services.js";
import {createFirstGameScene} from "../../Game/CreateGame.js";

class StartGameMenuSelector
{
    constructor()
    {
        this.startGameMenuController = new StartGameMenuController(startGameMenuView);
    }

    show()
    {
        Services.getUser()
            .then(response =>
        {
            if(response.status === 0)
                startGameMenuView.show();
            else
                createFirstGameScene();
        })
            .catch(exit =>
        {
        });
    }

    hide()
    {
        Services.getUser()
            .then(response =>
            {
                if(response.status === 0)
                    startGameMenuView.hide();
            })
            .catch(exit =>
            {
            });
    }

}

export default StartGameMenuSelector;
