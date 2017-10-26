/**
    Widget module
    provides a basic widget functionality
    a widget is represented as a <div></div> by default
    If a tag is not specified, than a new object is not created, but existingElem is used
 */

class Widget
{
    /**
     *
     * @param parent - parent element in DOM tree
     * @param tag - current widget's tag
     * @param className - its CSS Class
     * @param existingElem - if this value is not null, then wrap Widget around it instead of creating a new one
     */
    constructor(parent = document.body, tag = "div", className = "", existingElem = null)
    {
        if(existingElem)
            this.element = existingElem;
        else
        {
            this.element = document.createElement(tag);
            this.element.className = className;
            parent.appendChild(this.element);
        }
    }

    // Appearance
    show()
    {
        for(var i = 0; i < this.element.childNodes.length; i++)
            if(this.element.childNodes[i].nodeType === Node.ELEMENT_NODE)
                this.element.childNodes[i].style.visibility = "visible";
        this.element.style.visibility = "visible";

        this.onShow();
    }

    hide()
    {
        for(let i = 0; i < this.element.childNodes.length; i++)
            if(this.element.childNodes[i].nodeType === Node.ELEMENT_NODE)
                this.element.childNodes[i].style.visibility = "hidden";
        this.element.style.visibility = "hidden";

        this.onHide();
    }

    onShow()
    {
    }

    onHide()
    {
    }

    addEventHandler(eventName, eventHandler)
    {
        this.element.addEventListener(eventName, eventHandler);
    }

    removeEventHandler(eventName, eventHandler)
    {
        this.element.removeEventListener(eventName, eventHandler);
    }

    move(left, top, right, bottom)
    {
        this.element.style.left = left;
        this.element.style.right = right;
        this.element.style.top = top;
        this.element.style.bottom = bottom;
    }

    appendChildWidget(childWidget)
    {
        this.element.appendChild(childWidget.element);
    }

    appendChildNode(childNode)
    {
        this.element.appendChild(childNode);
    }

    get positionType()
    {
        return this.element.position;
    }

    set positionType(type)
    {
        this.element.position = type;
    }

    get background()
    {
        return this.element.style.background;
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

    clearClassList()
    {
        this.element.classList = null;
    }

    get classList()
    {
        return this.classList;
    }

    set classList(classListParam)
    {
        this.element.classList = classListParam;
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
        this.element.textContent = msg;
    }

    get text()
    {
        return this.element.textContent;
    }
}

export default Widget;
