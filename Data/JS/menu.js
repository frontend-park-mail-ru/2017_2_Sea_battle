/**
 * Main menu Module
 * Creates main menu
 */
;
(function()
{
    const menuFactory = new document.MenuFactory;

    var mainMenu = menuFactory.createMenu();
    var menuContainer = menuFactory.createContainer(mainMenu.element, "menuContainer");
    menuFactory.createText(menuContainer.element, "menuTitle", "Sea Battle");
    menuFactory.createButton(menuContainer.element, "menuItem", "Start Game", function()
                                                                                {
                                                                                    mainMenu.hide();
                                                                                    document.playMenu.show();
                                                                                });
    menuFactory.createContainer(menuContainer.element, "menuSpacerSmall");
    menuFactory.createButton(menuContainer.element, "menuItem", "Leaderboard", function(){mainMenu.hide();});
    menuFactory.createContainer(menuContainer.element, "menuSpacerSmall");
    menuFactory.createButton(menuContainer.element, "menuItem", "About", function(){mainMenu.hide();});

    document.mainMenu = mainMenu;
    document.playMenu = null;
}
)();