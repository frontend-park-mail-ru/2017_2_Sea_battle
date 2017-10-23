"use strict";
import Widget from "../../Blocks/Widget.js";

class BaseView extends Widget
{
    /**
     * @param parent - parent HTMLElement
     * @param templateFunc - function to generate html from data
     * @param data - data for templateFunc
     * @param viewContainerClass - CSS Class for template-generated view container
     */
    constructor(parent = document.body, templateFunc = undefined, data = {}, viewContainerClass = "baseView")
    {
        super(parent, "div", viewContainerClass);
        if(templateFunc !== undefined)
            this.templateFunc = templateFunc;
        else
            throw {message: "Invalid templateFunc"};

        this.element.innerHTML = templateFunc(data);

        this.hide();
    }

    /**
     * @param newData - new data to display
     */
    changeData(newData)
    {
        this.element.innerHTML = this.templateFunc(newData);
    }
}

export default BaseView;
