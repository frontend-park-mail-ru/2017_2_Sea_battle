"use strict";
// JS
import MenuManager from "./Modules/MenuManager.js";
import EventBus from "./Modules/EventBus.js";
import AddOrientationEvent from "./Modules/OrientationChange.js"
import LoadingScreen from "./Modules/Blocks/LoadingScreen/LoadingScreen.js";
// CSS
import "./CSS/Styles.css"
import "./Game/CSS/GameStyle.css"
import "./Game/CSS/LoaderStyle.css"
import "./Modules/Blocks/Input/Input.css"
import "./Modules/Views/UserProfileBlockView/UserProfileBlock.css"
import "./Modules/Views/LoginMenuView/LoginMenuView.css"
import "./Modules/Views/AboutMenuView/AboutMenuView.css"
import "./Modules/Views/BaseMenuView/BaseMenuView.css"
import "./Modules/Views/BaseView/BaseView.css"
import "./Modules/Views/LeaderboardView/LeaderboardView.css"
import "./Modules/Blocks/MessageBox/MessageBox.css";
import "./Modules/Blocks/LoadingScreen/LoadingScreen.css";

const eventBus = new EventBus();
const menuManager = new MenuManager();
eventBus.subscribe(menuManager);
menuManager.go();

AddOrientationEvent();

//let screen = new LoadingScreen("Some loading text");
//screen.show();



window.onpopstate = menuManager.go.bind(menuManager);
