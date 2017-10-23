"use strict";

import Button from "../Blocks/Button/Button.js";
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

        this.view.element.childNodes.forEach((item) =>
        {
            if(item.dataset.id === "back")
            {
                this.backButton = new Button(item);
                this.backButton.addEventHandler("click", function()
                {
                    eventBus.emitEvent({type: "goBack"});
                }.bind(eventBus));
            }
        });

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
}

export default BaseController;
