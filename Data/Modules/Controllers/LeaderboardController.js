"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";

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
                let highlight = 10;

                if(result[10] && result[10].position <= 10)
                {
                    highlight = result[10].position - 1;
                    result.pop();
                }

                this.deleteBackButton();
                this.view.changeData({title: "Leaderboard", players: result, highlightIndex: highlight});
                this.createBackButton();
            })
            .catch(() =>
            {
                this.deleteBackButton();
                new MessageBox("Network error", "Can't get leaderboard info");
                this.createBackButton();
            });
    }
}

export default LeaderboardController;
