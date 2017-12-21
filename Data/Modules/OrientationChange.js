"use strict";

import MessageBox from "./Blocks/MessageBox/MessageBox.js";

function OrientationChange() {
    setTimeout(function () {
        if(window.innerHeight > window.innerWidth) {
            new MessageBox("Rotate your device for best experience");
        }
    }, 50);
}

function AddOrientationEvent() {
    window.addEventListener("orientationchange", OrientationChange);
}

export {AddOrientationEvent, OrientationChange};
