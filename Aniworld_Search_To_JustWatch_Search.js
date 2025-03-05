// ==UserScript==
// @name         Aniworld Search To JustWatch Search
// @description  Adds a button which redirects you with the current searched input on aniworld to Justwatch with the searched input. When Enter is pressed it triggers the button in case you wanna change that you dont have to change the button type (!It is not a submit button) you have to change the HTML Position since it currently works in the Same Div as the input Field.
// @author       PicollusDerWaldspecht
// @match        https://aniworld.to/search*
// ==/UserScript==

(function () {
    'use strict';

    var button = document.createElement("button");
    button.innerHTML = "Search on JustWatch";
    button.style.marginTop = "10px";

    button.style.backgroundColor = "#1a73e8";
    button.style.color = "#ffffff";
    button.style.border = "1px solid #1a73e8";
    button.style.padding = "8px 16px";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";

    button.addEventListener("click", function () {
        var query = document.getElementById("search").value;
        var justWatchUrl = "https://www.justwatch.com/de/Suche?q=" + encodeURIComponent(query);
        window.open(justWatchUrl, "_blank");
    });

    var searchForm = document.querySelector(".searchForm");
    searchForm.appendChild(button);
})();
