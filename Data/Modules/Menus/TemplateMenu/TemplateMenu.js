/**
 * TemplateMenu - parent class for menus with from template generated content
 */
;
(function()
{
    const MenuContainer = document.MenuContainer;

    class TemplateMenu extends MenuContainer
    {
        constructor(parent = document.body, menuClass = "menuContainer",
                    menuTitleText = "", menuTitleTextClass = "menuTitle",
                    previousMenu = null, backButtonClass = "")
        {
            super(parent, menuClass, menuTitleText, menuTitleTextClass, previousMenu, backButtonClass);
            this.innerHolder = document.createElement("div");
            this.appendNode(this.innerHolder);
        }
    }

    document.TemplateMenu = TemplateMenu;
})();
