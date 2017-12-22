"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
class AboutMenuController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.title = "About menu";
        this.url = "/aboutMenu";
    }

    onShow()
    {
        this.view.changeData({title: "About", text: []});
        Services.getAboutText()
            .then((res) =>
            {
                this.deleteBackButton();
                this.view.changeData({title: "About", text: res.about});
                this.createBackButton();
            })
            .catch((error) =>
            {
                this.deleteBackButton();
                new MessageBox("Network error", "Can't get about info");
                this.createBackButton();
            });
    }
}

export default AboutMenuController;
