"use strict";

import Widget from "../Widget.js";

class Input
{
    constructor(label = null, input = null, error = null)
    {
        if(label)
            this.label = new Widget(null, "", "", label);
        if(input)
            this.input = new Widget(null, "", "", input);
        if(error)
            this.errorLab = new Widget(null, "", "", error);
    }

    clear()
    {
        this.input.element.value = "";
    }

    set value(value)
    {
        this.input.element.value = value;
    }

    get value()
    {
        return this.input.element.value;
    }

    clearError()
    {
        this.errorLab.text = "";
    }

    set error(text)
    {
        this.errorLab.text = text;
    }

    get error()
    {
        return this.errorLab.text;
    }
}

export default Input;
