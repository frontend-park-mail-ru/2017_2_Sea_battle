/**
 * menuFactory module
 * designed to make menus creation easier
 */
;
(function()
{
    const Widget = document.Widget;

    class MenuFactory
    {
        createMenu(id = "")
        {
            let menu = new Widget(document.body, "div");
            menu.idMenu = id;

            return menu;
        }

        createText(parent = document.body, className = "", text = "")
        {
            let div = new Widget(parent, "div", className);
            div.text = text;

            return div;
        }

        createLabel(parent = document.body, className= "", text = "")
        {
            let lab = new Widget(parent, "label", className);
            lab.text = text;

            return lab;
        }

        createInput(parent = document.body, inputClass = "", defaultText = "", labelClass = "", labelText = "")
        {

            if(labelText != "")
                this.createLabel(parent, labelClass, labelText);

            let input = new Widget(parent, "input", inputClass);
            input.value = defaultText;

            return input;
        }

        createContainer(parent = document.body, className = "")
        {
            return new Widget(parent, "div", className);
        }

        createCenteredContainer(parent = document.body, className = "")
        {
            return new Widget(parent, "center", className);
        }

        createButton(parent = document.body, className = "", text = "", action = undefined)
        {
            let Button = new Widget(parent, "div", className);
            Button.element.addEventListener("click", action);
            Button.text = text;

            return Button;
        }

    }

    document.MenuFactory = MenuFactory;
})();