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
               this.view.changeData({title: "Leaderboard", players: result});
            })
            .catch(error =>
            {
                this.view.changeData({title: "Leaderboard", players: [error]});
            });

    }
}

export default LeaderboardController;
