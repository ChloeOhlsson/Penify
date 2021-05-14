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
            
        this.workspace.content.appendChild(this.cursor);
        
        this.context = this.workspace.tools.canvas.getContext("2d");

        this.context.restore();
    };

    unselect() {
        this.workspace.main.style.cursor = "unset";

        this.cursor.remove();
    };

    mouseEnter(event, left, top) {

    };

    mouseDown(event, left, top) {

    };

    mouseMove(event, left, top, down) {

    };

    mouseUp(event, left, top) {

    };

    mouseLeave(event, left, top) {

    };
};

class Tools {
    constructor(workspace) {
        this.workspace = workspace;

        this.element = document.createElement("ul");
        this.element.classList.add("tools");

        this.workspace.left.appendChild(this.element);

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.workspace.width;
        this.canvas.height = this.workspace.height;
        this.workspace.content.appendChild(this.canvas);

        this.down = false;

        this.workspace.main.addEventListener("mouseenter", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) * this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) * this.workspace.scale);
            
            this.active.cursor.style.display = "block";

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseEnter(event, left, top);
        });

        this.workspace.main.addEventListener("mousedown", (event) => {
            if(this.down == true)
                return;
                
            this.down = true;

            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);

            this.active.mouseDown(event, left, top);
        });

        this.workspace.main.addEventListener("mousemove", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseMove(event, left, top, this.down);
        });

        this.workspace.main.addEventListener("mouseup", (event) => {
            this.down = false;

            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);

            this.active.mouseUp(event, left, top);
        });

        this.workspace.main.addEventListener("mouseleave", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);
            
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
