/**
 * Main Menu module - constructs the very first menu you see at start-up
 */
;
(function()
{
    const Widget = document.Widget;
    const MenuItem = document.MenuItem;
    const MenuContainer = document.MenuContainer;

    const playMenu = document.playMenu;
    const leaderboardMenu = document.leaderboardMenu;
    const aboutMenu = document.aboutMenu;

    var mainMenu = new MenuContainer(document.body, "menuContainer", "Sea Battle", "menuTitle");
    mainMenu.createItem("Start Game", "menuItem", function(){mainMenu.hide(); playMenu.show();});
    mainMenu.createItem("Leaderboard", "menuItem", function(){mainMenu.hide(); leaderboardMenu.show();});
    mainMenu.createItem("About", "menuItem", function(){mainMenu.hide(); aboutMenu.show();});

    document.mainMenu = mainMenu;
})()
