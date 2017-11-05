"use strict";
import MenuManager from "./Modules/MenuManager.js";
import EventBus from "./Modules/EventBus.js";


const eventBus = new EventBus();
const menuManager = new MenuManager();
eventBus.subscribe(menuManager);

window.onpopstate = menuManager.go.bind(menuManager);
