// ==UserScript==
// @name         Steam Client Link
// @version      1.0
// @description  Tampermonkey Script which adds a hyperlink on the Steam Sites to open the Site in the Steam Client
// @author       PicollusDerWaldspecht
// @match        *://store.steampowered.com/*
// @match        *://steamcommunity.com/*
// @icon         https://store.steampowered.com/favicon.ico
// ==/UserScript==

(function() {
    'use strict';

    function addButton() {
        const header = document.querySelector('.supernav_container');

        if (header) {
            const currentUrl = window.location.href;

            const newMenuItem = document.createElement('a');
            newMenuItem.className = 'menuitem';
            newMenuItem.href = `steam://openurl/${currentUrl}`;
            newMenuItem.innerText = 'Open in Client';

            newMenuItem.style.color = 'white';

            header.appendChild(newMenuItem);
        }
    }

    window.addEventListener('load', addButton);
})();
