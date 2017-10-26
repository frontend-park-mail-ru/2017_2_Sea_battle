"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";

class LeaderboardController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.title = "Leaderboard";
        this.url = "/leaderboardMenu";
    }

    onShow()
    {
        this.view.changeData({title: "Leaderboard", players: []});
        Services.getLeaders()
            .then(result =>
            {
                this.deleteBackButton();
                debugger;
                this.view.changeData({title: "Leaderboard", players: result});
                this.createBackButton();
            })
            .catch(error =>
            {
                this.deleteBackButton();
                this.view.changeData({title: "Leaderboard", players: [error]});
                this.createBackButton();
            });
    }
}

export default LeaderboardController;
