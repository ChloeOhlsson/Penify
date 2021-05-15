class Tool {
    name = "???";
    icon = "fas fa-question";

    properties = {};

    hideCursor = false;

    constructor(workspace) {
        this.workspace = workspace;

        this.cursor = document.createElement("div");
        this.cursor.classList.add("canvas-cursor");
    };

    select(element) {
        if(this.hideCursor)
            this.workspace.canvas.style.cursor = "none";
            
        this.workspace.content.appendChild(this.cursor);

        for(let key in this.properties) {
            const property = document.createElement("div");
            
            if(this.properties[key] == "preview") {
                property.classList.add("tool-preview");
            }
            else if(this.properties[key] == "size") {
                property.classList.add("tool-property");

                property.innerHTML = `
                    <label>Size <span class="tool-property-value">${this[key]}px</span></label>

                    <div class="tool-property-range">
                        <button class="tool-property-range-minus"><i class="fas fa-minus"></i></button>

                        <input type="range" min="1" max="100" value="${this[key]}">

                        <button class="tool-property-range-plus"><i class="fas fa-plus"></i></button>
                    </div>
                `;

                const range = property.querySelector("input")
                
                range.addEventListener("change", (event) => {
                    this.change(key, parseInt(event.target.value));

                    property.querySelector(".tool-property-value").innerHTML = (this[key]) + "px";
                });

                property.querySelector(".tool-property-range-minus").addEventListener("click", (event) => {
                    if(this[key] == 1)
                        return;

                    this.change(key, this[key] - 1);

                    range.value = this[key];

                    property.querySelector(".tool-property-value").innerHTML = (this[key]) + "px";
                });

                property.querySelector(".tool-property-range-plus").addEventListener("click", (event) => {
                    if(this[key] == 100)
                        return;

                    this.change(key, this[key] + 1);

                    range.value = this[key];

                    property.querySelector(".tool-property-value").innerHTML = (this[key]) + "px";
                });
            }
            else if(this.properties[key] == "blend") {
                property.classList.add("tool-property");

                property.innerHTML = `
                    <label>Blending Mode <span class="tool-property-value">${this[key]}</span></label>

                    <div class="tool-property-list"></div>
                `;
                
                const modes = [ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity" ];
                const modesList = property.querySelector(".tool-property-list");
        
                for(let index = 0; index < modes.length; index++) {
                    const modeElement = document.createElement("div");
                    modeElement.classList.add("tool-property-blend");
                    modeElement.innerHTML = `
                        <div class="tool-property-blend-canvas">
                            <canvas width="80" height="50"></canvas>
                        </div>
        
                        <div class="tool-property-blend-name">${modes[index]}</div>
                    `;
                    
                    const canvas = modeElement.querySelector("canvas");
                    const context = canvas.getContext("2d");
        
                    context.fillStyle = "#1F2429";
                    context.fillRect(0, 0, canvas.width, canvas.height);
        
                    context.globalCompositeOperation = modes[index];
        
                    context.drawImage(App.logo, 0, 0, App.logo.width, App.logo.height, (canvas.width - 32) / 2, (canvas.height - 32) / 2, 32, 32);

                    if(modes[index] == this[key])
                        modeElement.classList.add("active");

                    modeElement.addEventListener("click", (event) => {
                        modesList.querySelector(".active").classList.remove("active");
                        modeElement.classList.add("active");

                        this.change(key, modes[index]);

                        property.querySelector(".tool-property-value").innerHTML = this[key];
                    });
        
                    modesList.appendChild(modeElement);
                }
            }

            element.appendChild(property);
        }
    };

    change(key, value) {
        if(key != null)
            this[key] = value;
    };

    unselect() {
        this.context.restore();

        this.workspace.canvas.style.cursor = "unset";

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

        this.workspace.tool.querySelector(".tool-hide").addEventListener("click", (event) => {
            this.workspace.tool.style.display = "none";
            this.workspace.canvas.style.marginLeft = "0";
        });

        this.container = this.workspace.tool.querySelector(".dialog-container");

        this.down = false;

        this.workspace.canvas.addEventListener("mouseenter", (event) => {
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

        this.workspace.canvas.addEventListener("mousedown", (event) => {
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

        this.workspace.canvas.addEventListener("mousemove", (event) => {
            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);

            this.active.cursor.style.left = left + "px";
            this.active.cursor.style.top = top + "px";

            this.active.mouseMove(event, left, top, this.down);
        });

        this.workspace.canvas.addEventListener("mouseup", (event) => {
            this.down = false;

            if(this.active == undefined)
                return;

            const rectangle = this.workspace.content.getBoundingClientRect();
            const left = Math.round((event.clientX - rectangle.left) / this.workspace.scale);
            const top = Math.round((event.clientY - rectangle.top) / this.workspace.scale);

            this.active.mouseUp(event, left, top);
        });

        this.workspace.canvas.addEventListener("mouseleave", (event) => {
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
        
        this.container.innerHTML = "";

        this.active = tool;

        this.active.element.classList.add("active");

        this.active.select(this.container);
        this.active.change(null, null);

        this.workspace.tool.style.display = "block";
        this.workspace.canvas.style.marginLeft = "120px";
    };
};
