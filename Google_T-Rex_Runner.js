// ==UserScript==
// @name         T-Rex Auto Runner
// @description  Automatically plays the Google T-Rex game
// @author       PicollusDerWaldspecht
// @match        https://trex-runner.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function triggerKeyPress(key) {
        var keyboardEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            keyCode: key
        });
        document.body.dispatchEvent(keyboardEvent);
    }

    function triggerKeyRelease(key) {
        var keyboardEvent = new KeyboardEvent('keyup', {
            bubbles: true,
            cancelable: true,
            keyCode: key
        });
        document.body.dispatchEvent(keyboardEvent);
    }

    function monitorObstacles() {
        if (Runner.instance_ && Runner.instance_.horizon.obstacles.length > 0) {
            var currentObstacle = Runner.instance_.horizon.obstacles[0];
            var gameSpeed = Runner.instance_.currentSpeed;
            var actionThreshold = 20 * gameSpeed - currentObstacle.width / 2;

            if (currentObstacle.xPos < actionThreshold) {
                if (currentObstacle.yPos > 75) {
                    triggerKeyRelease(40);
                    triggerKeyPress(38);
                } else {
                    if (currentObstacle.yPos < 50) {
                        triggerKeyPress(40);
                    } else {
                        triggerKeyRelease(40);
                    }
                }
            }
        }
        requestAnimationFrame(monitorObstacles);
    }
    monitorObstacles();
})();