
function prepareProfileBlock()
{
    document.profileBlock = new document.ProfileBlock(document.body, "profileBlock", "User Profile", "profileTitle");
    document.profileBlock.changeUser();
}

function preparePlayMenu()
{
    document.playMenu = new document.PlayMenu(document.body);
    document.playMenu.hide();
}

function prepareLoginMenu()
{
    var loginMenu = new document.LoginMenu(document.body, "menuContainer", "Login", "menuTitle",
    document.playMenu, "menuItem", "form");
    var mail = loginMenu.form.createInput("centerContainer", "text", "inputIdle",
        "", "", "E-Mail: ", "errorMessage", "");
    loginMenu.form.appendNewLine();
    var password = loginMenu.form.createInput("centerContainer", "password", "inputIdle",
    "", "", "Password: ", "errorMessage", "");
    loginMenu.form.appendNewLine();

    function callback() {
        let bError = false;

        mail.error.text = password.error.text = "";
        if (mail.input.element.value == "") {
            mail.error.text = "EMail field should not be empty!";
            bError = true;
        }
        else if (!isValidMail(mail.input.element.value)) {
            mail.error.text = "Invalid email!";
            bError = true;
        }
        if (password.input.element.value == "")
        {
            password.error.text = "Password field should not be empty!";
            bError = true;
        }

        if(!bError &&
            document.Services.serverCheck({mail: mail.input.element.value, password: password.input.element.value}))
                document.Services.changeUser({name: mail.input.element.value, password: password.input.element.value});

        return false;
    }

    loginMenu.form.createSubmit("centerContainer", "submit", "Login",
        callback);

    loginMenu.hide();
    document.login = loginMenu;
}

function prepareRegisterMenu()
{
    const LoginMenu = document.LoginMenu;
    const Services = document.Services;

    var registerMenu = new LoginMenu(document.body, "menuContainer", "Register", "menuTitle",
        document.mainMenu, "menuItem", "form");
    var name = registerMenu.form.createInput("centerContainer", "text", "inputIdle", "",
    "", "Nickname: ", "errorMessage", "");
    registerMenu.form.appendNewLine();
    var mail = registerMenu.form.createInput("centerContainer", "text", "inputIdle", "",
    "", "EMail: ", "errorMessage", "");
    registerMenu.form.appendNewLine();
    var password = registerMenu.form.createInput("centerContainer", "password", "inputIdle", "",
    "", "Password: ", "errorMessage", "");
    registerMenu.form.appendNewLine();
    var confirmPassword = registerMenu.form.createInput("centerContainer", "password", "inputIdle", "",
    "", "Confirm Password", "errorMessage", "");
    registerMenu.form.appendNewLine();

    function callback()
    {
        name.error.text = mail.error.text = password.error.text = confirmPassword.error.text = "";
        bError = false;

        if(name.input.element.value == "")
        {
            name.error.text = "Name field should not be empty!";
            bError = true;
        }
        if(mail.input.element.value == "")
        {
            mail.error.text = "Mail field should not be empty!";
            bError = true;
        }
        else if(!isValidMail(mail.input.element.value))
        {
            mail.error.text = "Invalid mail!";
            bError = true;
        }
        if(password.input.element.value == "")
        {
            password.error.text = "Password field should not be empty!";
            bError = true;
        }
        if(confirmPassword.input.element.value != password.input.element.value)
        {
            confirmPassword.error.text = "Confirm Password and Password field values should be the same";
            bError = true;
        }

        if(!bError && Services.checkRegister({mail: mail.input.element.value,
            name: name.input.element.value, password: password.input.element.value}))
                Services.changeUser({name: name.input.element.value});

        return false;
    }

    registerMenu.form.createSubmit("centerContainer", "submit", "Register", callback);
    registerMenu.hide();
    document.register = registerMenu;
}

function isValidMail(text)
{
    let reg = /[0-9A-Za-z\-\_]+@[A-Za-z\-\_]+\.[A-Za-z\-\_]+/; // RegExp for mail
    let match = text.match(reg);

    if(match != null && match[0] == text)
        return true;

    return false;
}


prepareProfileBlock();
preparePlayMenu();
prepareLoginMenu();
prepareRegisterMenu();
