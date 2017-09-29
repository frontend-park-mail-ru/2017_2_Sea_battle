/**
 * designService
 * This module is designed to provide additional functionality for easier page decoration
 */
;
(function()
{
    const Http = document.Http;

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

        static serverCheck(body)
        {
            return http.FetchPost("/login", body);
        }

        static changeUser(user)
        {
            http.FetchGet("/myName")
                .then((response) =>
            {
                document.currentUser = response;
                Services.changeMenu(document.mainMenu);
                document.profileBlock.changeUser(response);
            })
                .catch((response) =>
            {
                document.currentUser= null;
            });
        }

        static checkRegister(body)
        {
            return http.FetchPost("/register", body);
        }

        static getLeaders()
        {
            return http.FetchGet("/leaderboard");
        }

        static getAboutText()
        {
            return http.FetchGet("/about");
        }
    }

    document.Services = Services;
})();
