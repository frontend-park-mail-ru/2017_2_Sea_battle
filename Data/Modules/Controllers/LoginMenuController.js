"use strict";

import BaseController from "./BaseController.js";
import Input from "../Blocks/Input/Input.js";
import Services from "../Services.js";
import EventBus from "../EventBus.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";

const eventBus = new EventBus();

class LoginMenuController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.inputMail = new Input(null, document.loginForm.loginMailInput,
                                         document.getElementById("loginMailError"));
        this.inputPassword = new Input(null, document.loginForm.loginPasswordInput,
                                             document.getElementById("loginPasswordError"));
        document.loginForm.onsubmit = () => this.submitHandler();
        this.title = "Login";
        this.url = "/startGame/login";
    }

    onShow()
    {
        this.inputMail.clear();
        this.inputMail.clearError();
        this.inputPassword.clear();
        this.inputPassword.clearError();
    }

    submitHandler()
    {
        if(this.validate())
            Services.checkUser(this.inputMail.value, this.inputPassword.value)
                .then(() =>
                {
                    eventBus.emitEvent({type: "updateUser"});
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                })
                .catch(error =>
                {
                    new MessageBox("Login Error", error.response);
                });

        return false;
    }

    validate()
    {
        this.inputMail.clearError();
        this.inputPassword.clearError();

        let mail = this.inputMail.value;
        let pwd = this.inputPassword.value;
        let bValid = true;

        if(mail === "")
        {
            this.inputMail.error = "Mail is required!";
            bValid = false;
        }
        if(pwd === "")
        {
            this.inputPassword.error = "Password is required!";
            bValid = false;
        }

        if(!bValid)
            return false;

        if(!Services.isValidMail(mail))
        {
            this.inputMail.error = "Incorrect mail specified!";
            return false;
        }

        return true;
    }

}

export default LoginMenuController;
