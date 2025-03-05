// ==UserScript==
// @name         JustWatch Aniworld Button
// @match        https://aniworld.to/anime/stream/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const titleElement = document.querySelector('.series-title h1[itemprop="name"]');
    const seriesName = titleElement.getAttribute('data-alternativetitles').split(',')[0].trim();

    const justWatchButton = document.createElement('div');
    justWatchButton.title = 'Search on JustWatch';
    justWatchButton.setAttribute('data-fsk', 'JustWatch');
    justWatchButton.className = 'fsk fsk12';
    justWatchButton.style.marginRight = '8px';
    justWatchButton.style.background = '#000000';
    justWatchButton.style.border = 'none';
    justWatchButton.style.padding = '0 5px';
    justWatchButton.style.height = '20px';
    justWatchButton.style.lineHeight = '20px';

    const justWatchLink = document.createElement('a');
    justWatchLink.href = `https://www.justwatch.com/us/search?q=${encodeURIComponent(seriesName)}`;
    justWatchLink.target = '_blank';
    justWatchLink.rel = 'noopener';
    justWatchLink.style.textDecoration = 'none';
    justWatchLink.style.color = '#ff9900';
    justWatchLink.textContent = 'JustWatch';
    justWatchButton.appendChild(justWatchLink);

    const imdbButton = document.querySelector('.imdb-link');
    imdbButton.parentNode.insertBefore(justWatchButton, imdbButton);

})();
