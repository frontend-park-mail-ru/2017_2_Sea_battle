/**
 * Login menu - module, containing
 */
;
(function()
{
    const Form = document.Form;
    const MenuContainer = document.MenuContainer;
    const MenuItem = document.MenuItem;

    class LoginMenu extends MenuContainer
    {
        constructor(parent = document.body, menuClass = "menuContainer",
                    menuTitleText = "", menuTitleTextClass = "menuTitle",
                    previousMenu = null, backButtonClass = "", formClass = "form")
        {
            super(parent, menuClass, menuTitleText, menuTitleTextClass);
            this.form = new Form(this.element, formClass);
            if(previousMenu !== null && previousMenu !== undefined)
            {
                this.backButton = new MenuItem(this.element, backButtonClass);
                this.backButton.setClickAction(() => document.Services.changeMenu(previousMenu));
                this.backButton.text = "Back";
                this.appendChildWidget(this.backButton);
            }
        }
    }

    document.LoginMenu = LoginMenu;
})();
