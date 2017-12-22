"use strict";

import MessageBox from "./Blocks/MessageBox/MessageBox.js";

function OrientationChange() {
    if (window.orientation === undefined) {
        setTimeout(function () {
            if(window.innerHeight > window.innerWidth) {
                new MessageBox("Rotate your device for best experience");
            }
        }, 50);
    }
    else {
        if (window.orientation == 0 ||  window.orientation == 180) {
            new MessageBox("Rotate your device for best experience");
        }
    }
}

function AddOrientationEvent() {
    window.addEventListener("orientationchange", OrientationChange);
}

export {AddOrientationEvent, OrientationChange};
