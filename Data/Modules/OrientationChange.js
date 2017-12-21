"use strict";

import MessageBox from "./Blocks/MessageBox/MessageBox.js";

function OrientationChange() {
    if(window.innerHeight < window.innerWidth) {
        new MessageBox("Rotate your device for best experience");
    }
}

function AddOrientationEvent() {
    window.addEventListener("orientationchange", OrientationChange);
}

export default AddOrientationEvent;
