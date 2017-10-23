"use strict";
import MenuManager from "./Modules/MenuManager.js";
import EventBus from "./Modules/EventBus.js";

const eventBus = new EventBus();
const menuManager = new MenuManager();
eventBus.subscribe(menuManager);

window.onpopstate = menuManager.go.bind(menuManager);

//import Http from "./Modules/Http/http.js";
//import Services from "./Modules/Services.js";

/*
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
 let mail = loginMenu.form.createInput("centerContainer", "text", "inputIdle",
 "", "", "E-Mail: ", "errorMessage", "");
 loginMenu.form.appendNewLine();
 let password = loginMenu.form.createInput("centerContainer", "password", "inputIdle",
 "", "", "Password: ", "errorMessage", "");
 loginMenu.form.appendNewLine();
 let formError = loginMenu.form.createFormError();

 function callback() {
 let bError = false;

 mail.error.text = password.error.text = formError.text = "";
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

 if(!bError)
 {
 Services.serverCheck({mail: mail.input.element.value, password: password.input.element.value})
 .then((response) =>
 {
 Services.changeUser({name: mail.input.element.value, password: password.input.element.value});
 })
 .catch((response) =>
 {
 formError.text = response.body.error;
 });
 }


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

 let registerMenu = new LoginMenu(document.body, "menuContainer", "Register", "menuTitle",
 document.mainMenu, "menuItem", "form");
 let name = registerMenu.form.createInput("centerContainer", "text", "inputIdle", "",
 "", "Nickname: ", "errorMessage", "");
 registerMenu.form.appendNewLine();
 let mail = registerMenu.form.createInput("centerContainer", "text", "inputIdle", "",
 "", "EMail: ", "errorMessage", "");
 registerMenu.form.appendNewLine();
 let password = registerMenu.form.createInput("centerContainer", "password", "inputIdle", "",
 "", "Password: ", "errorMessage", "");
 registerMenu.form.appendNewLine();
 let confirmPassword = registerMenu.form.createInput("centerContainer", "password", "inputIdle", "",
 "", "Confirm Password", "errorMessage", "");
 registerMenu.form.appendNewLine();
 let formError = registerMenu.form.createFormError();

 function callback()
 {
 name.error.text = mail.error.text = password.error.text = confirmPassword.error.text = formError.text = "";
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

 if(!bError)
 {
 Services.checkRegister({mail: mail.input.element.value,
 name: name.input.element.value, password: password.input.element.value})
 .then((response) =>
 {
 Services.changeUser({name: name.input.element.value});
 })
 .catch((response) =>
 {
 formError.text = response.error;
 });
 }

 return false;
 }

 registerMenu.form.createSubmit("centerContainer", "submit", "Register", callback);
 registerMenu.hide();
 document.register = registerMenu;
 }

 function prepareLeaderboard()
 {
 const TemplateMenu = document.TemplateMenu;

 let leaderboard = new TemplateMenu(document.body, "menuContainer", "Leaderboard", "menuTitle",
 document.mainMenu, "menuItem");

 leaderboard.innerHolder.className = "tableHolder";
 leaderboard.onShow =
 () =>
 {
 Services.getLeaders().then((response) =>
 {
 leaderboard.innerHolder.innerHTML = leaderboardTemplate({players: response});
 })
 };
 leaderboard.hide();

 document.leaderboardMenu = leaderboard;
 }

 function prepareAbout()
 {
 const TemplateMenu = document.TemplateMenu;

 let about = new TemplateMenu(document.body, "menuContainer", "About", "menuTitle",
 document.mainMenu, "menuItem");

 about.onShow =
 (() =>
 {
 Services.getAboutText().then((response) =>
 {
 about.innerHolder.innerHTML = aboutTemplate(response)
 })
 });
 about.hide();

 document.aboutMenu = about;
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
 prepareLeaderboard();
 prepareAbout();
Http.BaseUrl = "http://" + window.location.host;
 */
