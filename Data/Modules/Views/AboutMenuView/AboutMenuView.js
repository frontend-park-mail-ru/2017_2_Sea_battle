"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateAboutMenuView = require("./AboutMenuView.pug");

const aboutMenu = new BaseView(document.body, generateAboutMenuView, {title: "About", text: []});

export default aboutMenu;
