class Workspace {
    name = "Unnamed workspace";

    width = 800;
    height = 600;

    constructor(name, width, height) {
        this.tab = document.createElement("li");
        this.tab.innerHTML = `<span class="workspace-name">???</span> <button class="workspace-remove"><i class="fas fa-times"></i></button>`;
        this.tab.addEventListener("click", (event) => {
            if(event.target != this.tab)
                return;

            Workspaces.focus(this);
        });

        this.tab.querySelector(".workspace-remove").addEventListener("click", (event) => {
            Workspaces.remove(this);
        });

        this.element = document.createElement("div");
        this.element.classList.add("workspace");
        this.element.innerHTML = `
            <section class="left"></section>

            <section class="main">
                <div class="canvas">
                    <div class="canvas-content">
                        
                    </div>
                </div>
            </section>

            <section class="right"></section>

            <section class="footer">
                <div class="footer-information"><i class="fas fa-pencil-alt"></i> Left mouse to pixel with primary color, right mouse for secondary color.</div>
            
                <div class="footer-properties">
                    <p><i class="far fa-image"></i> <span class="footer-properties-width">???</span>&#215;<span class="footer-properties-height">???</span></p>
                
                    <p><span class="footer-properties-zoom">100%</span></p>

                    <div>
                        <button><i class="fas fa-search-minus"></i></button>

                        <input type="range" min="1" max="100" value="50">
                        
                        <button><i class="fas fa-search-plus"></i></button>
                    </div>
                </div>
            </section>
        `;

        this.main = this.element.querySelector(".main");
        this.canvas = this.element.querySelector(".canvas");
        this.content = this.canvas.querySelector(".canvas-content");

        this.left = this.element.querySelector(".left");

        this.tools = new Tools(this);
        this.tools.add(new Pen(this));

        this.right = this.element.querySelector(".right");

        this.layers = new Layers(this);

        this.history = new History(this);

        this.zoomConstructor();
        
        this.layers.create();

        this.setName(name);
        this.setSize(width, height);
    };

    zoomConstructor() {
        const speed = 0.1;
        
        const position = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const pointer = { x: 0, y: 0 };
        
        this.scale = 1;

        this.element.addEventListener("wheel", (event) => {
            if(!event.ctrlKey)
                return;
                
            event.preventDefault();
            
            pointer.x = event.pageX - this.canvas.offsetLeft;
            pointer.y = event.pageY - this.canvas.offsetTop;
            target.x = (pointer.x - position.x) / this.scale;
            target.y = (pointer.y - position.y) / this.scale;
            
            this.scale += -1 * Math.max(-1, Math.min(1, event.deltaY)) * speed * this.scale;
            this.scale = Math.max(.1, Math.min(8, this.scale));

            position.x = -target.x * this.scale + pointer.x;
            position.y = -target.y * this.scale + pointer.y;

            this.content.style.margin = `${position.y}px 0 0 ${position.x}px`;
            this.content.style.transform = `scale(${this.scale})`;
        }, { passive: false });
    };

    setName(name) {
        this.name = name || this.name;
        
        this.tab.querySelector(".workspace-name").innerHTML = this.name;
    };

    setSize(width, height) {
        this.width = width || this.width;
        this.height = height || this.height;

        this.element.style.setProperty("--width", this.width + "px");
        this.element.style.setProperty("--height", this.height + "px");

        this.element.querySelector(".footer-properties-width").innerHTML = this.width;
        this.element.querySelector(".footer-properties-height").innerHTML = this.height;
    };
};
