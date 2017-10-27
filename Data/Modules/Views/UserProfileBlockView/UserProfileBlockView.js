"use strict";

import BaseView from "../BaseView/BaseView.js";

const userProfileBlockView = new BaseView(document.body, generateUserProfileBlockView,
    {
        loggedIn: false,
        name: null,
    }, "profileBlock");

export default userProfileBlockView;
