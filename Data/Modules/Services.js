/**
 * designService
 * This module is designed to provide additional functionality for easier page decoration
 */

'use strict';

import Http from "./Http/http.js";

class Services
{
    static getLeaders()
    {
        return Http.FetchGet("/leaderboard");
    }

    static getAboutText()
    {
        return Http.FetchGet("/about");
    }
}

export default Services;
