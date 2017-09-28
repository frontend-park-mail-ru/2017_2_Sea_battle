/**
 * Main Menu module - constructs the very first menu you see at start-up
 */
;
(function()
{
    const MenuContainer = document.MenuContainer;

    let mainMenu = new MenuContainer(document.body, "menuContainer", "Sea Battle", "menuTitle");
    mainMenu.createItem("Start Game", "menuItem", () => document.Services.changeMenu(document.playMenu));
    mainMenu.createItem("Leaderboard", "menuItem", () => document.Services.changeMenu(document.leaderboardMenu));
    mainMenu.createItem("About", "menuItem", () => document.Services.changeMenu(document.aboutMenu));

    document.currentMenu = document.mainMenu = mainMenu;
})()
