/**
 * Profile Block Module - block at top left corner containing information about current player
 */
;
(function()
{
   const Widget = document.Widget;
   const MenuContainer = document.MenuContainer;
   const MenuItem = document.MenuItem;
   const Services = document.Services;

   const notLoggedMsg = "You are not currently logged in";

   class ProfileBlock extends MenuContainer
   {
        constructor(parent = document.body, menuClass = "profileBlock",
                    menuTitleText = "", menuTitleTextClass = "profileTitle")
        {
            super(parent, menuClass, menuTitleText, menuTitleTextClass);
            this.subtitle = new MenuItem(this.element, "profileSubtitle", notLoggedMsg);

            this.login = new MenuItem(this.element, "profileItem", "Log-in");
            this.login.setClickAction(function(){Services.changeMenu(document.login);});

            this.register = new MenuItem(this.element, "profileItem", "Register");
            this.register.setClickAction(function(){Services.changeMenu(document.register);});

            this.logout = new MenuItem(this.element, "profileItem", "Log-out");
            this.logout.setClickAction(function(){document.Services.logout(); this.changeUser();}.bind(this));
            this.logout.hide();

        }

        changeUser()
        {
            let user = document.currentUser;
            if(user === null)
            {
                this.subtitle.text = notLoggedMsg;
                this.logout.hide();
                this.login.show();
                this.register.show();
            }
            else
            {
                this.subtitle.text = user.name;
                this.login.hide();
                this.register.hide();
                this.logout.show();
            }
        }
   }

   document.ProfileBlock = ProfileBlock;
})();
