"use strict";

import BaseView from "../BaseView/BaseView.js";

const registerMenuView = new BaseView(document.body, generateRegisterMenuView, {title: "Register"});

export default registerMenuView;
