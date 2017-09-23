/**
 * validationMenu module
 * register and login menus are here
 */
;
(function()
{
    const menuFactory = new document.MenuFactory;

    // Login menu
    var loginMenu = menuFactory.createMenu();
    var loginContainer = menuFactory.createContainer(loginMenu.element, "menuContainer");
    menuFactory.createText(loginContainer.element, "menuTitle", "Login");
    var username = menuFactory.createInput(menuFactory.createCenteredContainer(loginContainer.element).element,
        "inputIdle", "", "menuText", "Username: ");
    var usernameError = menuFactory.createText(username.element.parentNode, "errorMessage");
    var password = menuFactory.createInput(menuFactory.createCenteredContainer(loginContainer.element).element,
        "inputIdle", "", "menuText", "Password: ");
    password.element.type = "password";
    var passwordError = menuFactory.createText(password.element.parentNode, "errorMessage");
    menuFactory.createButton(loginContainer.element, "validate", "Log in", login);
    menuFactory.createButton(loginContainer.element, "menuItem", "Back", function()
    {
        loginMenu.hide();
        document.playMenu.show()
    });

    function login()
    {
        usernameError.element.innerHTML = passwordError.element.innerHTML = ""; // Reset previous errors
        if(username.element.value == "")
            usernameError.element.innerHTML = "Mail field should not be empty";
        else if(!validateMail(username.element.value))
            usernameError.element.innerHTML = "This is not a valid email address";
        if(password.element.value == "")
            passwordError.element.innerHTML = "Password field should not be empty";

        // Here we must send a request to back
        // If successful - let in, otherwise - throw an error;
    }


    loginMenu.hide();
    document.loginMenu = loginMenu;

    // Register menu
    var registerMenu = menuFactory.createMenu();
    var registerContainer = menuFactory.createContainer(registerMenu.element, "menuContainer");
    menuFactory.createText(registerContainer.element, "menuTitle", "Register new Gamer");
    var regMail = menuFactory.createInput(menuFactory.createCenteredContainer(registerContainer.element).element,
        "inputIdle", "", "menuText", "Mail address: ");
    var regMailError = menuFactory.createText(regMail.element.parentNode, "errorMessage");
    var regName = menuFactory.createInput(menuFactory.createCenteredContainer(registerContainer.element).element,
        "inputIdle", "", "menuText", "Nickname: ");
    var regNameError = menuFactory.createText(regName.element.parentNode, "errorMessage");
    var regPassword = menuFactory.createInput(menuFactory.createCenteredContainer(registerContainer.element).element,
        "inputIdle", "", "menuText", "Password: ");
    regPassword.element.type = "password";
    var regPasswordError = menuFactory.createText(regPassword.element.parentNode, "errorMessage");
    var regPasswordRepeat = menuFactory.createInput(menuFactory.createCenteredContainer(registerContainer.element).element,
        "inputIdle", "", "menuText", "Repeat password: ");
    regPasswordRepeat.element.type = "password";
    password.element.type = "password";
    var regPasswordRepeatError = menuFactory.createText(regPasswordRepeat.element.parentNode, "errorMessage");
    menuFactory.createButton(registerContainer.element, "validate", "Register", register);
    menuFactory.createButton(registerContainer.element, "menuItem", "Back", function()
    {
        registerMenu.hide();
        document.playMenu.show()
    });

    function register()
    {
        regMailError.element.innerHTML = regNameError.element.innerHTML =
                                 regPasswordError.element.innerHTML = regPasswordRepeatError.element.innerHTML = "";
        if(regMail.element.value == "")
            regMailError.element.innerHTML = "Mail field should not be empty!";
        else if(!validateMail(regMail.element.value))
            regMailError.element.innerHTML = "This is not a valid mail!";

        if(regName.element.value == "")
            regNameError.element.innerHTML = "Nickname field should not be empty!";

        if(regPassword.element.value == "")
            regPasswordError.element.innerHTML = "Password field should not be empty!";
        debugger;
        if(regPasswordRepeat.element.value != regPassword.element.value)
            regPasswordRepeatError.element.innerHTML = "Repeated password should be the same as password!";
    }

    function validateMail(mail)
    {
        let reg = /[0-9A-Za-z\-\_]+@[A-Za-z\-\_]+\.[A-Za-z\-\_]+/; // RegExp for mail
        let match = mail.match(reg);

        if(match != null && match[0] == mail)
            return true;

        return false;
    }

    registerMenu.hide();
    document.registerMenu = registerMenu;

})();