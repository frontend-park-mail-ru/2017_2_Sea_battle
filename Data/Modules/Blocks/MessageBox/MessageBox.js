"use strict";

import BaseView from "../../Views/BaseView/BaseView.js";

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
            debugger;
            if(item.dataset.name === "okButton")
                okButton = item;
        });

        if(okAction)
            okButton.onclick = () => {okAction(); this.view.hide(); delete this;};
        else
            okButton.onclick = () => {this.view.hide(); delete this;};

        this.view.show();
    }
}

export default MessageBox;
