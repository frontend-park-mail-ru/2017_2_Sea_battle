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

    static isValidMail(text)
    {
        let reg = /[0-9A-Za-z.\-\_]+@[0-9A-Za-z.\-\_]+\.[A-Za-z\-\_]+/; // RegExp for mail
        let match = text.match(reg);

        return (match != null && match[0] == text);
    }

    static checkUser(mail, pwd)
    {
        return Http.FetchPost("/login", {"loginEmail": mail, "password": pwd});
    }

    static registerUser(mail, nickname, pwd)
    {
        return Http.FetchPost("/users", {"login": nickname, "email": mail, "password": pwd});
    }

    static getUser()
    {
        return Http.FetchGet("/info");
    }

    static logoutUser()
    {
        return Http.FetchGet("/logout");
    }
}

export default Services;
