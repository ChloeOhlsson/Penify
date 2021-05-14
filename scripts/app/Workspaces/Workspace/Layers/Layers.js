class Layers extends WorkspaceItem {
    constructor(workspace) {
        super(workspace);

        this.element = document.createElement("div");
        this.element.classList.add("dialog");
        this.element.innerHTML = `
            <div class="dialog-header">
                <div class="dialog-header-title">Layers</div>
            
                <div class="dialog-header-buttons">
                    <button class="dark add"><i class="fas fa-plus"></i></button>
                </div>
            </div>

            <div class="dialog-container"></div>
        `;
        this.element.querySelector(".add").addEventListener("click", (event) => {
            this.create();
        });

        this.container = this.element.querySelector(".dialog-container");
        
        this.workspace.right.appendChild(this.element);
    };

    add(layer) {
        layer.element = document.createElement("div");
        layer.element.classList.add("layer");
        layer.element.innerHTML = `
            <canvas class="layer-thumbnail" width="${this.workspace.width}" height="${this.workspace.height}"></canvas>

            <div class="layer-name">${layer.name}</div>

            <div class="layer-buttons">
                <button class="layer-remove"><i class="fas fa-times"></i></button>
            </div>
        `;

        layer.element.addEventListener("click", (event) => {
            if(event.target != layer.element)
                return;

            this.focus(layer);
        });

        layer.element.querySelector(".layer-remove").addEventListener("click", (event) => {
            this.remove(layer);
        });
        
        this.container.appendChild(layer.element);
    };

    create() {
        const layer = new Layer(this.workspace);

        this.add(layer);
        this.focus(layer);
    };  

    focus(layer) {
        this.active?.history.remove();
        this.active?.element.classList.remove("active");

        this.active = layer;

        this.workspace.history.container.appendChild(this.active.history);
        this.active.element.classList.add("active");
    };

    remove(layer) {
        const element = document.createElement("div");
        element.classList.add("dialog-overlay");
        element.innerHTML = `
            <div class="dialog-overlay-content">
                Are you sure you want to delete ${layer.name}?

                <div class="dialog-overlay-buttons">
                    <button class="fill remove">Remove</button>

                    <button class="fill-dark cancel">Cancel</button>
                </div>
            </div>
        `;

        element.addEventListener("click", (event) => {
            if(event.target != element)
                return;

            element.remove();
        });

        element.querySelector(".cancel").addEventListener("click", (event) => {
            element.remove();
        });

        element.querySelector(".remove").addEventListener("click", (event) => {
            element.remove();
            
            layer.element.remove();
        });

        this.element.appendChild(element);
    };
};
