class Workspace {
    name = "Unnamed workspace";

    constructor() {
        this.tab = document.createElement("li");
        this.tab.innerHTML = `${this.name} <button class="workspace-remove"><i class="fas fa-times"></i></button>`;
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
                    <p><i class="far fa-image"></i> <span class="footer-properties-width">800</span>&#215;<span class="footer-properties-height">600</span></p>
                
                    <p><span class="footer-properties-zoom">100%</span></p>

                    <div>
                        <button><i class="fas fa-search-minus"></i></button>

                        <input type="range" min="1" max="100" value="50">
                        
                        <button><i class="fas fa-search-plus"></i></button>
                    </div>
                </div>
            </section>
        `;

        this.left = this.element.querySelector(".left");

        this.tools = new Tools(this);
        this.tools.add(new Pen(this));

        this.right = this.element.querySelector(".right");

        this.layers = new Layers(this);
        this.layers.add(new Layer(this));

        this.history = new History(this);
    };
};
