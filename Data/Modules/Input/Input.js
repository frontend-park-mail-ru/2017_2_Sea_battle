/**
 * Input module - a wrap around <input> tag
 */
;
(function()
{
    const Widget = document.Widget;

    class Input extends Widget
    {
        constructor(parent = document.body, containerClass = "centerContainer", inputType = "text",
                    inputClass = "", inputValue = "", labelClass = "", labelText = "",
                    errorClass = "", errorMsg = "")
        {
            super(parent, "div", containerClass);
            this.label = new Widget(this.element, "label", labelClass);
            this.label.text = labelText;
            this.input = new Widget(this.element,"input", inputClass);
            this.input.element.type = inputType;
            this.error = new Widget(this.element, "label", errorClass);
            this.error.text = errorMsg;
        }

        set inputType(type)
        {
            this.input.type = type;
        }

        get inputType()
        {
            return this.input.type;
        }

        set inputValue(value)
        {
            this.input.value = value;
        }

        get inputValue()
        {
            return this.input.value;
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
