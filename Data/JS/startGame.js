/**
 * Start Game
 * Start Game menu is created here
 */
;
(function()
{
    const menuFactory = new document.MenuFactory;

    var playMenu = menuFactory.createMenu();
    var playContainer = menuFactory.createContainer(playMenu.element, "menuContainer");
    menuFactory.createText(playContainer.element, "menuTitle", "Start Game");
    menuFactory.createButton(playContainer.element, "menuItem", "Log in", function()
                                                                            {
                                                                                playMenu.hide();
                                                                                document.loginMenu.show();
                                                                            });
    menuFactory.createContainer(playContainer.element, "menuSpacerSmall");
    menuFactory.createButton(playContainer.element, "menuItem", "Register", function()
                                                                            {
                                                                                playMenu.hide();
                                                                                document.registerMenu.show();
                                                                            });
    menuFactory.createContainer(playContainer.element, "menuSpacerSmall");
    menuFactory.createButton(playContainer.element, "menuItem", "Back", function()
                                                                                    {
                                                                                        playMenu.hide();
                                                                                        document.mainMenu.show()
                                                                                    });

    document.playMenu = playMenu;
    document.loginMenu = null;
    document.registerMenu = null;
    playMenu.hide();
})();