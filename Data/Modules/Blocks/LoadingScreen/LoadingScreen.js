"use strict";

const squareCount = 3;

class LoadingScreen
{
    constructor(text)
    {
        this.element = document.createElement("span");
        this.element.classList.add("loading");

        this.squares = [];
        for(let i = 0; i <squareCount; i++)
        {
            this.squares.append(document.createElement("div"));
            this.squares[i].classList.add("loadingDice");
        }
        document.body.appendChild(this.element);

        this.element.textContent = text;
        this.hide();

        window.removeEventListener("resize", this.resize.bind(this));
    }

    show()
    {
        this.element.style.display = "block";
        this.squares.forEach((elem) => {elem.display = "block";});

        this.resize();
    }

    hide()
    {
        this.element.display = "none";
        this.squares.forEach((elem) => {elem.display = "none";});
    }

    kill()
    {
        document.body.removeChild(this.element);
        for(let i = 0; i < squareCount; i++)
            this.element.removeChild(this.squares[i]);

        window.removeEventListener("resize", this.resize);
    }

    resize()
    {
        this.element.style.top = (document.documentElement.clientHeight - this.element.clientHeight)/2 + "px";
        this.element.style.left = (document.documentElement.clientWidth - this.element.clientWidth)/2 + "px";
    }
}

export default LoadingScreen;
