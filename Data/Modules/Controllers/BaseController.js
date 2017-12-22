"use strict";

import Button from "../Blocks/Button.js";
import EventBus from "../EventBus.js";

const eventBus = new EventBus();

class BaseController
{
    /**
     *
     * @param view - view to control
     */
    constructor(view)
    {
        this.view = view;

        this.createBackButton();

        this.title = "Base Menu";
        this.url = "baseUrl";
    }

    hide()
    {
        this.view.hide();
        this.onHide();
    }

    show()
    {
        this.view.show();
        this.onShow();
    }

    onShow(){}
    onHide(){}

    goBackHandler()
    {
        eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
    }

    deleteBackButton()
    {
        this.backButton.removeEventHandler("click", this.goBackHandler);
        delete this.backButton;
    }

    createBackButton()
    {
        this.view.element.childNodes.forEach((item) =>
        {
            if(item.dataset.id === "back")
            {
                this.backButton = new Button(item);
                this.backButton.addEventHandler("click", this.goBackHandler);
            }
        });
    }
}

export default BaseController;
