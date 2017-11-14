"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";
import Button from "../Blocks/Button.js";
import EventBus from "../EventBus.js";
import GameScene from "../../Game/GameScene.js";
import {BackMenu} from "../../Game/GameSceneWinLose.js";


const eventBus = new EventBus();

class UserProfileBlockController extends BaseController
{
    constructor(view)
    {
        super(view);
    }

    onShow()
    {
        this.updateUser();
    }

    createButtons()
    {
        let logoutElem = document.getElementById("logout");
        if(logoutElem !== undefined && logoutElem !== null)
        {
            this.logout = new Button(logoutElem);
            this.logout.addEventHandler("click", this.logoutAction);
        }

        let loginElem = document.getElementById("login");
        if(loginElem !== undefined && loginElem !== null)
        {
            this.login = new Button(document.getElementById("login"));
            this.login.addEventHandler("click", this.loginAction);
        }

        let registerElem = document.getElementById("register");
        if(registerElem !== undefined && registerElem !== undefined)
        {
            this.register = new Button(document.getElementById("register"));
            this.register.addEventHandler("click", this.registerAction);
        }
    }

    removeButtons()
    {
        if(this.login !== undefined)
        {
            this.login.removeEventHandler("click", this.loginAction);
            delete this.login;
        }

        if(this.logout !== undefined)
        {
            this.logout.removeEventHandler("click", this.logoutAction);
            delete this.logout;
        }

        if(this.register !== undefined)
        {
            this.register.removeEventHandler("click", this.registerAction);
            delete this.register;
        }
    }

    logoutAction()
    {
        Services.logoutUser()
            .then((response) =>
            {
                eventBus.emitEvent({type: "updateUser"});
                BackMenu();
                /*
                let gameScene = new GameScene();
                gameScene.hide();
                eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                */
            });
    }

    loginAction()
    {
        eventBus.emitEvent({type: "changeMenu", newMenuName: "/startGame/login"});
    }

    registerAction()
    {
        eventBus.emitEvent({type: "changeMenu", newMenuName: "/startGame/register"});
    }

    updateUser()
    {
        Services.getUser()
            .then((res) =>
            {
                this.removeButtons();

                if(res.status === undefined)
                    this.view.changeData({name: res.login, loggedIn: true, score: res.score});
                else
                    this.view.changeData({loggedIn: false});

                this.createButtons();
            })
            .catch((error) =>
            {
            });
    }
}

export default UserProfileBlockController;
