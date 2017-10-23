"use strict";

import BaseController from "./BaseController.js";
import Button from "../Blocks/Button/Button.js";
import EventBus from "../EventBus.js";

const eventBus = new EventBus();

class MainMenuController extends BaseController
{
    constructor(view)
    {
        super(view);
        this.buttons = {};
        this.view.element.childNodes.forEach((item) =>
        {
            let id = item.dataset.id;
            if(id === undefined)
                return;

            this.buttons[id] = new Button(item);
            item.addEventListener("click", () =>
            {
                eventBus.emitEvent({type: "changeMenu", newMenuName: item.dataset.id});
            });
        });

        this.title = "Sea Battle";
        this.url = "/";
    }
}

export default MainMenuController;
