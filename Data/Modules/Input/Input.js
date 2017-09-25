/**
 * Input module - a wrap around <input> tag
 */
;
(function()
{
    const Widget = document.Widget;

    class Input extends Widget
    {
        constructor(parent = document.body, inputType = "text",
                    inputClass = "", inputValue = "", labelClass = "", labelText = "",
                    errorClass = "", errorMsg = "")
        {
            super(parent, "input", inputClass);
            this.label = new Widget(parent, "label", labelClass);
            this.label.text = labelText;
            this.element.type = inputType;
            this.error = new Widget(parent, "label", errorClass);
            this.error.text = errorMsg;
            parent.insertBefore(this.label.element, this.element);
            parent.appendChild(this.error.element);
        }

        set inputType(type)
        {
            this.element.type = type;
        }

        get inputType()
        {
            return this.element.type;
        }

        set inputValue(value)
        {
            this.element.value = value;
        }

        get inputValue()
        {
            return this.element.value;
        }

        getLabel()
        {
            return this.label;
        }

        set errorMsg(text)
        {
            this.error.textContent = text;
        }

        get errorMsg()
        {
            return this.error.textContent;
        }

        getErrorLabel()
        {
            return this.error;
        }
    }

    document.Input = Input;
})();
