/**
 * Profile Entry - module with menu to log in and register new players
 */
(function()
{
    const MenuContainer = document.MenuContainer;

    let profileEntry = new MenuContainer(document.parent, "menuContainer",
        "Profile Entry", "menuTitle", document.mainMenu, "menuItem");
    profileEntry.createItem("Log-in", "menuItem", () => document.Services.changeMenu(document.login));
    profileEntry.createItem("Register", "menuItem", () => document.Services.changeMenu(document.register));

    profileEntry.hide();
    document.profileEntry = profileEntry;

})();
