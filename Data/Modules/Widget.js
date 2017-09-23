/**
    Widget module
    provides a basic widget funtionality
    a widget is represented as a <div></div> by default
 */

;
(function() {
    class Widget
    {
        constructor(parent, tag, className)
        {
            if(tag != null && tag != undefined)
                this.element = document.createElement(tag);
            else
                this.element = document.createElement("div")

            if(className != null && className != undefined)
                this.element.className = className;
            else
                this.element.className = "";

            if (parent != undefined && parent != null)
                parent.appendChild(this.element);
            else
                document.body.appendChild(this.element);

        }

        // Appearance

        // TODO: show children aswell
        show()
        {
            for(var i = 0; i < this.element.childNodes.length; i++)
                this.element.childNodes[i].style.visibility = "visible";
            this.element.style.visibility = "visible";
        }

        // TODO: hide children aswell
        hide()
        {
            for(var i = 0; i < this.element.childNodes.length; i++)
                this.element.childNodes[i].style.visibility = "hidden";
            this.element.style.visibility = "hidden";
        }

        move(left, top, right, bottom)
        {
            this.element.style.left = left;
            this.element.style.right = right;
            this.element.style.top = top;
            this.element.style.bottom = bottom;
        }

        get positionType()
        {
            return this.element.position;
        }

        set positoinType(type)
        {
            this.element.position = type;
        }

        get background()
        {
            this.element.style.background;
        }

        set background(bg)
        {
            this.element.style.background = bg;
        }

        get style()
        {
            return this.element.style;
        }

        set className(className)
        {
            this.element.className = className;
        }

        get className()
        {
            return this.element.className;
        }

        set idName(idName)
        {
            this.element.id = idName;
        }

        get idName()
        {
            return this.element.id;
        }

        resize(wid, hei)
        {
            this.element.style.width = wid;
            this.element.style.height = hei;
        }

        set text(msg)
        {
            this.element.innerHTML = msg;
        }

        get text()
        {
            return this.element.innerHTML;
        }
    }

    document.Widget = Widget;

})();