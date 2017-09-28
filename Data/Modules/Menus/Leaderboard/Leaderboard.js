/**
 * Leaderboard Module - Leaderboard menu stuff
 */
;
(function()
{
    const MenuContainer = document.MenuContainer;

    class Leaderboard extends MenuContainer
    {
        constructor(parent = document.body, menuClass = "menuContainer",
                    menuTitleText = "", menuTitleTextClass = "menuTitle",
                    previousMenu = null, backButtonClass = "")
        {
            super(parent, menuClass, menuTitleText, menuTitleTextClass, previousMenu, backButtonClass);
            this.tableHolder = document.createElement("div");
            this.appendNode(this.tableHolder);
        }

        onShow()
        {
            this.tableHolder.innerHTML = leaderboardTemplate({players: document.Services.getLeaders()});
        }
    }

    let leaderboard = new Leaderboard(document.body, "menuContainer", "Leaderboard", "menuTitle",
        document.mainMenu, "menuItem");

    leaderboard.hide();
    document.Leaderboard = Leaderboard;
    document.leaderboardMenu = leaderboard;
})();
