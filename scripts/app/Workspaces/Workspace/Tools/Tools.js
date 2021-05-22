class Tools {
    constructor(workspace) {
        this.workspace = workspace;

        this.element = document.createElement("ul");
        this.element.classList.add("tools");

        this.workspace.left.appendChild(this.element);

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.workspace.width;
        this.canvas.height = this.workspace.height;
        this.context = this.canvas.getContext("2d");
        this.workspace.content.appendChild(this.canvas);

        this.workspace.tool.querySelector(".tool-hide").addEventListener("click", (event) => {
            this.workspace.tool.style.display = "none";
            this.workspace.canvas.style.marginLeft = "0";
        });

        this.container = this.workspace.tool.querySelector(".dialog-container");

        this.down = false;

        this.workspace.canvas.addEventListener("mouseenter", (event) => {
            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event);
            
            this.active.cursor.style.display = "block";

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseEnter(this.context, event, left, top);
        });

        this.workspace.canvas.addEventListener("touchstart", (event) => {
            event.preventDefault();

            if(event.touches.length == 0)
                return;

            if(this.down == true)
                return;
                
            this.down = true;

            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event.touches[0]);

            this.active.mouseDown(this.context, event, left, top);
        });

        this.workspace.canvas.addEventListener("mousedown", (event) => {
            if(this.down == true)
                return;
                
            this.down = true;

            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event);

            this.active.mouseDown(this.context, event, left, top);
        });

        this.workspace.canvas.addEventListener("touchmove", (event) => {
            event.preventDefault();

            if(this.active == undefined)
                return;

            for(let index = 0; index < event.touches.length; index++) {
                const { left, top } = this.getCursor(event.touches[index]);

                this.active.cursor.style.left = left + "px";
                this.active.cursor.style.top = top + "px";

                this.active.mouseMove(event, left, top, this.down);
            }
        });

        this.workspace.canvas.addEventListener("mousemove", (event) => {
            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event);

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseMove(this.context, event, left, top, this.down);
        });

        this.workspace.canvas.addEventListener("touchend", (event) => {
            event.preventDefault();

            this.down = false;

            if(this.active == undefined)
                return;

            this.active.mouseUp(event, null, null);
        });

        this.workspace.canvas.addEventListener("mouseup", (event) => {
            this.down = false;

            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event);

            this.active.mouseUp(this.context, event, left, top);
        });

        this.workspace.canvas.addEventListener("mouseleave", (event) => {
            if(this.active == undefined)
                return;

            const { left, top } = this.getCursor(event);
            
            this.active.cursor.style.display = "";

            this.active.mouseLeave(this.context, event, left, top);
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
        
        this.container.innerHTML = "";

        this.active = tool;

        this.active.element.classList.add("active");

        this.active.select(this.container);
        this.active.change(null, null);

        this.workspace.tool.style.display = "block";
        this.workspace.canvas.style.marginLeft = "120px";
    };

    getCursor(event) {
        const rectangle = this.workspace.content.getBoundingClientRect();
        const left = Math.floor((event.clientX - rectangle.left) / this.workspace.scale);
        const top = Math.floor((event.clientY - rectangle.top) / this.workspace.scale);
    
        return { left, top };
    };
};
