/**
 * designService
 * This module is designed to provide additional functionality for easier page decoration
 */
;
(function()
{
    class Services
    {
        static placeItem(element)
        {
            element.style.left = (Math.random() * 100) + "%";
            element.style.top = (Math.random() * 100) + "%";
            element.style.position = "absolute";
        }

        static changeMenu(newMenu)
        {
            document.currentMenu.hide();
            document.currentMenu = newMenu;
            newMenu.show();

        }

        static logout()
        {
            document.currentUser = null;
        }

        static serverCheck(pair)
        {
            // Should send request
            return true;
        }

        static changeUser(pair)
        {
            document.currentUser = {name: pair.name};
            document.profileBlock.changeUser();
            Services.changeMenu(document.mainMenu);
        }

        static checkRegister(userInfo)
        {
            // Should send request
            return true;
        }

        static getLeaders()
        {
            return [{name: "YAX", score: 9000}, {name: "Jo", score: 1050}, {name: "Liz", score: 10}];
        }

        static getAboutText()
        {
            return ["Sea Battle Game", "Made for Front End course"];
        }
    }

    document.Services = Services;
})();
