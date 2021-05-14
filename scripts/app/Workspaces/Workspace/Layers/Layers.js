class Layers extends WorkspaceItem {
    constructor(workspace) {
        super(workspace);

        this.element = document.createElement("div");
        this.element.classList.add("dialog");
        this.element.innerHTML = `
            <div class="dialog-header">
                <div class="dialog-header-title">Layers</div>
            
                <div class="dialog-header-buttons">
                    <button class="dark"><i class="fas fa-plus"></i></button>
                </div>
            </div>

            <div class="dialog-container"></div>
        `;

        this.container = this.element.querySelector(".dialog-container");
        
        this.workspace.right.appendChild(this.element);
    };

    add(layer) {
        layer.element = document.createElement("div");
        layer.element.classList.add("layer");
        layer.element.innerHTML = `
            <div class="layer-thumbnail"></div>

            <div class="layer-name">${layer.name}</div>

            <div class="layer-buttons">
                <button class="layer-remove"><i class="fas fa-times"></i></button>
            </div>
        `;

        layer.element.querySelector(".layer-remove").addEventListener("click", (event) => {
            this.remove(layer);
        });
        
        this.container.appendChild(layer.element);
    };

    remove(layer) {
        const element = document.createElement("div");
        element.classList.add("dialog-overlay");
        element.innerHTML = `
            <div class="dialog-overlay-content">
                Are you sure you want to delete ${layer.name}?

                <div class="dialog-overlay-buttons">
                    <button class="fill remove">Remove</button>

                    <button class="fill-transparent cancel">Cancel</button>
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
