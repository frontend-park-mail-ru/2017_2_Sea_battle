"use strict";

import BaseView from "../BaseView/BaseView.js";

let data = {title: "About", text: []};
const aboutMenu = new BaseView(document.body, generateAboutMenuView, data);

export default aboutMenu;
