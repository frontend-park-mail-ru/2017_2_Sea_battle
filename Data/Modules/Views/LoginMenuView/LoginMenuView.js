"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateLoginMenuView = require("./LoginMenuView.pug");

const loginMenuView = new BaseView(document.body, generateLoginMenuView, {title: "Login"});

export default loginMenuView;
