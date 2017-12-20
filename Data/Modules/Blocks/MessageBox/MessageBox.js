"use strict";

import BaseView from "../../Views/BaseView/BaseView.js";
let generateMessageBox = require("./MessageBox.pug");

class MessageBox
{
    /**
     *
     * @param title - Message Box title
     * @param message - Message Box message
     * @param [okAction] - action on ok button click
     */
    constructor(title, message, okAction = null)
    {
        this.view = new BaseView(document.body, generateMessageBox, {message, title}, "messageBox");

        let okButton = null;
        this.view.element.childNodes.forEach(item =>
        {
            if(item.dataset.name === "okButton")
                okButton = item;
        });

        if(okAction)
            okButton.onclick = () =>
            {
                okAction();
                this.view.hide();
                window.removeEventListener("resize", this.resize);
            };
        else
            okButton.onclick = () =>
            {
                this.view.hide();
                window.removeEventListener("resize", this.resize);
            };

        this.view.show();
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize()
    {
        this.view.element.style.left = (document.body.offsetWidth - this.view.element.offsetWidth)/2 + "px";
        this.view.element.style.top = (document.documentElement.clientHeight - this.view.element.clientHeight)/2 + "px";
    }
}

export default MessageBox;
