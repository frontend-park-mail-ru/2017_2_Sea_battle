"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";

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
                this.view.changeData({title: "About", text: res.text});
                this.createBackButton();
            })
            .catch((error) =>
            {
                this.deleteBackButton();
                this.view.changeData({title: "About", text: [error]});
                this.createBackButton();
            });
    }
}

export default AboutMenuController;
