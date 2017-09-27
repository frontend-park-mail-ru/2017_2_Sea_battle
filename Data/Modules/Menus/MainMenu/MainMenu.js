/**
 * Main Menu module - constructs the very first menu you see at start-up
 */
;
(function()
{
    const MenuContainer = document.MenuContainer;

    var mainMenu = new MenuContainer(document.body, "menuContainer", "Sea Battle", "menuTitle");
    mainMenu.createItem("Start Game", "menuItem", function(){document.Services.changeMenu(document.playMenu);});
    mainMenu.createItem("Leaderboard", "menuItem", function(){document.Services.changeMenu(document.leaderboardMenu);});
    mainMenu.createItem("About", "menuItem", function(){document.Services.changeMenu(document.aboutMenu);});

    document.currentMenu = document.mainMenu = mainMenu;
})()
