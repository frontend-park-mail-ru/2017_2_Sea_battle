/**
 * designService
 * This module is designed to provide additional functionality for easier page decoration
 */
;
(function()
{
    var module = {};

    function placeItem(element)
    {
        element.style.left = (Math.random() * 100) + "%";
        element.style.top = (Math.random() * 100) + "%";
        element.style.position = "absolute";
    }

    module.placeItem = placeItem;
    document.designService = module;
})();