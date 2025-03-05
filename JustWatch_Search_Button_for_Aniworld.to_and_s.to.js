// ==UserScript==
// @name         JustWatch Search Button for Aniworld.to and s.to
// @namespace    http://tampermonkey.net/
// @version      1.7
// @author       PicollusDerWaldspecht
// @description  Adds search buttons on JustWatch results to search on Aniworld.to and s.to
// @match        https://www.justwatch.com/us/search?q=*
// ==/UserScript==

// TO - DO
// Bug fixing (The Website on Justwatch opens with a lef click on one of the icons but a Middle mouse button click works and i have no clue why)

(function () {
    'use strict';

    function createSearchButton(title, site, url) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "nofollow sponsored noopener";
        link.className = "offer";

        const img = document.createElement("img");
        img.src = site === "Aniworld.to"
            ? "https://aniworld.to/favicon.ico?v=1"
            : "https://s.to/favicon.ico?v=1";
        img.width = 50;
        img.height = 50;
        img.alt = `${site} Icon`;
        img.classList.add("offer__icon");

        link.appendChild(img);

        link.onclick = function (event) {
            event.preventDefault();
            window.open(url, '_blank');

        };

        return link;
    }

    function addSearchButtons() {
        const titles = document.querySelectorAll(".header-title");

        titles.forEach((titleElement) => {
            if (!titleElement.hasAttribute("data-has-buttons")) {
                const title = titleElement.textContent.trim();

                const aniworldUrl = `https://aniworld.to/search?q=${encodeURIComponent(title)}`;
                const stoUrl = `https://s.to/search?q=${encodeURIComponent(title)}`;

                const aniworldButton = createSearchButton(title, "Aniworld.to", aniworldUrl);
                const stoButton = createSearchButton(title, "s.to", stoUrl);

                const buttonContainer = document.createElement("div");
                buttonContainer.style.display = "flex";
                buttonContainer.style.gap = "10px";
                buttonContainer.classList.add("button-container");

                buttonContainer.appendChild(aniworldButton);
                buttonContainer.appendChild(stoButton);
                titleElement.parentElement.appendChild(buttonContainer);

                titleElement.setAttribute("data-has-buttons", "true");
            }
        });
    }

    function observeDOMChanges() {
        addSearchButtons();

        const observer = new MutationObserver(() => addSearchButtons());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', observeDOMChanges);
})();
