// ==UserScript==
// @name         Emulate Typing for 10fastfinger
// @namespace    http://tampermonkey.net/
// @version      1.7
// @author       PicollusDerWaldspecht
// @description  Emulate typing text word by word with pauses for space bar press and delay in 10fastfingers typing test
// @match        https://10fastfingers.com/typing-test/german
// @grant        none
// ==/UserScript==

//This Script is Currently Broken it doesn't recognize the input so you have to manually press the space bar after every word to get it working

(function () {
    'use strict';

    alert("This Script is Currently Broken it doesn't recognize the input so you have to manually press the space bar after every word to get it working");
    const sourceDivSelector = '#row1';
    const targetSelector = '#inputfield';
    const minDelay = 5;
    const maxDelay = 5;
    const spacePressDelay = 200;

    function getRandomDelay() {
        return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    }

    async function typeWord(targetElement, word) {
        for (let char of word) {
            targetElement.value += char;

            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            targetElement.dispatchEvent(new Event('change', { bubbles: true }));

            console.log(`Typing character: ${char}`);
            await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
        }
    }

    function waitForSpacePress() {
        return new Promise(resolve => {
            function onSpacePress(event) {
                if (event.key === ' ') {
                    document.removeEventListener('keydown', onSpacePress);
                    setTimeout(resolve, spacePressDelay);
                }
            }
            document.addEventListener('keydown', onSpacePress);
        });
    }

    async function extractAndTypeWords() {
        const sourceDiv = document.querySelector(sourceDivSelector);
        const targetElement = document.querySelector(targetSelector);

        if (sourceDiv && targetElement) {
            const words = Array.from(sourceDiv.querySelectorAll('span')).map(span => span.textContent);

            for (let word of words) {
                await typeWord(targetElement, word);
                console.log(`Typed word: ${word}`);

                await waitForSpacePress();
            }
        } else {
            console.log("Source div or target input field not found.");
        }
    }

    window.addEventListener('load', () => {
        console.log("Page loaded. Starting to search for elements...");
        setTimeout(extractAndTypeWords, 1000);
    });
})();
