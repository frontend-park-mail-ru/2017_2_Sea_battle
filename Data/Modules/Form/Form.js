/**
 * Form module - provides methods for easy form creation
 * (Registration, Logging-in and etc)
 */
;
(function()
{
    const Widget = document.Widget;
    const Input = document.Input;

    class Form extends Widget
    {
        constructor(parent = document.body, className = "")
        {
            super(parent, "form", className);
        }

        createInput(containerClass = "centerContainer", inputType = "text", inputClass = "", inputValue = "",
        labelClass = "", labelText = "", errorClass = "", errorMsg = "")
        {
            return new Input(this.element, containerClass,  inputType, inputClass, inputValue, labelClass, labelText,
            errorClass, errorMsg);
        }

        createSubmit(containerClass = "centerContainer", submitClass = "", submitText = "", submitHandler = null)
        {
            let submit = new Input(this.element, containerClass, "button", submitClass, submitText, "", "", "", "");
            submit.input.element.value = submitText;
            if(submitHandler != null && submitHandler != undefined)
                submit.element.addEventListener("click", submitHandler);

            return submit;
        }

        appendNewLine()
        {
            let node = document.createElement("div");
            node.className = "newLine";
            this.element.appendChild(node);
        }
    }

    document.Form = Form;
})();
