// ==UserScript==
// @name         Redirect Via Keywords
// @noframes
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  This Script Redirects based on the given keywords in the search bar it is inspired by the ecosia keyword redirect.
// @author       PicollusDerWaldspecht
// @match        https://www.ecosia.org/*
// @match        https://www.google.com/*
// @match        https://duckduckgo.com/*
// @match        https://search.brave.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const keywords = {
        'JustWatch': {
            url: 'https://www.justwatch.com/us/search?q=',
            base: 'https://www.justwatch.com',
            aliases: ['#justwatch', '#jw']
        },
        'Aniworld': {
            url: 'https://aniworld.to/search?q=',
            base: 'https://aniworld.to',
            aliases: ['#aniworld', '#aw']
        },
        'Netflix': {
            url: 'https://www.netflix.com/search?q=',
            base: 'https://www.netflix.com',
            aliases: ['#netflix', '#net']
        },
        'Youtube': {
            url: 'https://www.youtube.com/results?search_query=',
            base: 'https://www.youtube.com',
            aliases: ['#youtube', '#yt']
        },
        'Twitch': {
            url: 'https://www.twitch.tv/search?term=',
            base: 'https://www.twitch.tv/',
            aliases: ['#twitch', '#tw']
        },
        'U.GG': {
            url: 'https://u.gg/lol/champions/',
            base: 'https://u.gg/',
            aliases: ['#ugg', '#u']
        },
        'Wikipedia': {
            url: 'https://de.wikipedia.org/wiki/',
            base: 'https://de.wikipedia.org/wiki/Wikipedia:Hauptseite',
            aliases: ['#wikipedia', '#wiki']
        },
        'Amazon': {
            url: 'https://www.amazon.de/s?k=',
            base: 'https://www.amazon.de/',
            aliases: ['#amazon', '#amz']
        },
        'SteamDB': {
            url: 'https://steamdb.info/instantsearch/?query=',
            base: 'https://steamdb.info/',
            aliases: ['#steamdb', '#sd']
        },
        'ChatGPT': {
            url: 'https://chatgpt.com/?q=',
            base: 'https://chatgpt.com/',
            aliases: ['#chatgpt', '#ai']
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    const foundKeyword = Object.keys(keywords).find(keyword => keywords[keyword].aliases.some(alias => query.includes(alias)));
    if (foundKeyword) {

        const searchTerm = query.replace(keywords[foundKeyword].aliases.find(alias => query.includes(alias)), '').trim();

        if (searchTerm) {
            window.location.href = `${keywords[foundKeyword].url}${encodeURIComponent(searchTerm)}`;
        } else {
            window.location.href = keywords[foundKeyword].base;
        }
    }
})();