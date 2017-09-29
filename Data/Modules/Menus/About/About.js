/**
 * About - module for about menu
 */
;
(function()
{
    const TemplateMenu = document.TemplateMenu;

    class About extends TemplateMenu
    {
        onShow()
        {
            this.innerHolder.innerHTML = aboutTemplate({text: document.Services.getAboutText()});
        }
    }

    let about = new TemplateMenu(document.window, "menuContainer", "About", "menuTitle",
    document.mainMenu, "menuItem");
    about.hide();
    document.aboutMenu = about;


})();
