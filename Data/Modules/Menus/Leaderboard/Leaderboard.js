/**
 * Leaderboard Module - Leaderboard menu stuff
 */
;
(function()
{
    const TemplateMenu = document.TemplateMenu;

    class Leaderboard extends TemplateMenu
    {
        onShow()
        {
            this.innerHolder.innerHTML = leaderboardTemplate({players: document.Services.getLeaders()});
        }
    }

    let leaderboard = new Leaderboard(document.body, "menuContainer", "Leaderboard", "menuTitle",
        document.mainMenu, "menuItem");
    leaderboard.innerHolder.className = "tableHolder";

    leaderboard.hide();
    document.Leaderboard = Leaderboard;
    document.leaderboardMenu = leaderboard;
})();
