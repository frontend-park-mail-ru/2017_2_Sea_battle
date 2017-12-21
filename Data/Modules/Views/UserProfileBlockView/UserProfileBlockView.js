"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateUserProfileBlockView = require("./UserProfileBlockView.pug");

const userProfileBlockView = new BaseView(document.body, generateUserProfileBlockView,
    {
        loggedIn: false,
        name: null,
    }, "profileBlock");

export default userProfileBlockView;
