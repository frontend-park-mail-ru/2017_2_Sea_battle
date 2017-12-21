"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateRegisterMenuView = require("./RegisterMenuView.pug");

const registerMenuView = new BaseView(document.body, generateRegisterMenuView, {title: "Register"});

export default registerMenuView;
