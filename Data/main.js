"use strict";
import MenuManager from "./Modules/MenuManager.js";
import EventBus from "./Modules/EventBus.js";
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

const eventBus = new EventBus();
const menuManager = new MenuManager();
eventBus.subscribe(menuManager);
menuManager.go();

window.onpopstate = menuManager.go.bind(menuManager);
