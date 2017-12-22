"use strict";

import MessageBox from "./Blocks/MessageBox/MessageBox.js";

function OrientationChange() {
    console.log(window.orientation);
    setTimeout(function () {
        if(window.innerHeight > window.innerWidth) {
            new MessageBox("Rotate your device for best experience");
        }
    }, 100);
}

function AddOrientationEvent() {
    window.addEventListener("orientationchange", OrientationChange);
}

export {AddOrientationEvent, OrientationChange};
