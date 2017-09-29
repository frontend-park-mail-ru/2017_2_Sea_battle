/**
 * Play Menu - module containing game field
 */
;
(function()
{
    const MenuContainer = document.MenuContainer;

    class PlayMenu extends MenuContainer
    {
        constructor(parent = document.body)
        {
            super(parent, "playMenu", "Game Field (kinda)", "menuTitle", document.mainMenu, "menuItem");
        }

        onShow()
        {
            if(document.currentUser === null)
                document.Services.changeMenu(document.profileEntry);
        }
    }

    document.PlayMenu = PlayMenu;
})();
