class Tool {
    name = "???";
    icon = "fas fa-question";

    hideCursor = false;

    constructor(workspace) {
        this.workspace = workspace;

        this.cursor = document.createElement("div");
        this.cursor.classList.add("canvas-cursor");
    };

    select() {
        if(this.hideCursor)
            this.workspace.main.style.cursor = "none";
            
        this.workspace.canvas.appendChild(this.cursor);
    };

    unselect() {
        this.workspace.main.style.cursor = "unset";

        this.cursor.remove();
    };

    mouseEnter(event) {

    };

    mouseMove(event) {

    };

    mouseLeave(event) {

    };
};

class Tools {
    constructor(workspace) {
        this.workspace = workspace;

        this.element = document.createElement("ul");
        this.element.classList.add("tools");

        this.workspace.left.appendChild(this.element);

        this.workspace.main.addEventListener("mouseenter", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.canvas.getBoundingClientRect();
            const left = Math.round(event.clientX - rectangle.left);
            const top = Math.round(event.clientY - rectangle.top);
            
            this.active.cursor.style.display = "block";

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseEnter(event, left, top);
        });

        this.workspace.main.addEventListener("mousemove", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.canvas.getBoundingClientRect();
            const left = Math.round(event.clientX - rectangle.left);
            const top = Math.round(event.clientY - rectangle.top);

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseMove(event, left, top);
        });

        this.workspace.main.addEventListener("mouseleave", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.canvas.getBoundingClientRect();
            const left = Math.round(event.clientX - rectangle.left);
            const top = Math.round(event.clientY - rectangle.top);
            
            this.active.cursor.style.display = "";

            this.active.mouseLeave(event, left, top);
        });
    };

    add(tool) {
        tool.element = document.createElement("li");
        tool.element.innerHTML = `<button class="dark"><i class="${tool.icon}"></i></button></li>`;
        tool.element.addEventListener("click", (event) => {
            this.select(tool);
        });

        if(this.active == undefined)
            this.select(tool);

        this.element.appendChild(tool.element);
    };

    select(tool) {
        this.active?.unselect();

        this.active?.element.classList.remove("active");

        if(this.active != tool) {
            this.active = tool;

            this.active.element.classList.add("active");

            this.active.select();
        }
        else
            delete this.active;
    };
};
