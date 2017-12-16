"use strict";

import BaseController from "./BaseController.js";
import Input from "../Blocks/Input/Input.js";
import Services from "../Services.js";
import EventBus from "../EventBus.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";

const eventBus = new EventBus();

class RegisterMenuController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.inputMail = new Input(null, document.registerForm.registerMailInput,
            document.getElementById("registerMailError"));
        this.inputNickname = new Input(null, document.registerForm.registerNicknameInput,
            document.getElementById("registerNicknameError"));
        this.inputPassword = new Input(null, document.registerForm.registerPasswordInput,
            document.getElementById("registerPasswordError"));
        this.inputRepeatPassword = new Input(null, document.registerForm.registerRepeatPasswordInput,
            document.getElementById("registerRepeatPasswordError"));
        document.registerForm.onsubmit = () => this.submitHandler();
        this.title = "Register";
        this.url = "/startGame/register";
    }

    onShow()
    {
        this.clearInput();
        this.clearErrorInput();
    }

    clearInput()
    {
        this.inputMail.clear();
        this.inputNickname.clear();
        this.inputPassword.clear();
        this.inputRepeatPassword.clear();
    }

    clearErrorInput()
    {
        this.inputMail.clearError();
        this.inputNickname.clearError();
        this.inputPassword.clearError();
        this.inputRepeatPassword.clearError();
    }

    submitHandler()
    {
        let password = this.inputPassword.value; // Костыль, чтобы передать потом для логина
        if(this.validate())
            Services.registerUser(this.inputMail.value, this.inputNickname.value, this.inputPassword.value)
                .then(function(response)
                {
                    Services.checkUser(response.email, password).then(() => {eventBus.emitEvent({type: "updateUser"});});
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                }.bind(password))
                .catch(error =>
                {
                   new MessageBox("Register error", error.response);
                });

        return false;
    }

    validate()
    {
        this.clearErrorInput();

        let mail = this.inputMail.value;
        let nickname = this.inputNickname.value;
        let pwd = this.inputPassword.value;
        let reppwd = this.inputRepeatPassword.value;
        let bValid = true;

        if(mail === "")
        {
            this.inputMail.error = "Mail is required!";
            bValid = false;
        }
        else if(!Services.isValidMail(mail))
        {
            this.inputMail.error = "Invalid mail!";
            bValid = false;
        }

        if(nickname === "")
        {
            this.inputNickname.error = "Nickname is required!";
            bValid = false;
        }
        if(pwd === "")
        {
            this.inputPassword.error = "Password is required!";
            bValid = false;
        }
        if(reppwd === "")
        {
            this.inputRepeatPassword.error = "Repeat Password is required";
            bValid = false;
        }

        if(pwd !== reppwd)
        {
            this.inputRepeatPassword.error = "Repeat Password and Password are different!";
            bValid = false;
        }

        return bValid;
    }

}

export default RegisterMenuController;
