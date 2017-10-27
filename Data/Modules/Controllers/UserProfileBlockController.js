"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";

class UserProfileBlockController extends BaseController
{
    constructor(view)
    {
        super(view);
    }

    onShow()
    {
        this.updateUser();
    }

    updateUser()
    {
        Services.getUser()
            .then((res) =>
            {
                if(res.status === undefined)
                    this.view.changeData({name: res.name, loggedIn: true});
                else
                    this.view.changeData({loggedIn: false});
            })
            .catch((error) =>
            {
            });
    }
}

export default UserProfileBlockController;
