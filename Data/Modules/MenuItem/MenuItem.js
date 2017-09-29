/**
 * MenuItem - module for menu items; Capable of showing text, mouse events handling and etc
 */
;
(function()
{
    const Widget = document.Widget;

    class MenuItem extends Widget
    {
        constructor(parent = document.body, className = "", text = "")
        {
            super(parent, "div", className);
            this.text = text;
        }

        setClickAction(action)
        {
            this.addEventHandler("click", action);
        }
    }

    document.MenuItem = MenuItem;
}
)();
