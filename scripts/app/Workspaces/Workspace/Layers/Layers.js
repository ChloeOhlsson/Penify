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
                <button><i class="fas fa-times"></i></button>
            </div>
        `;
        
        this.container.appendChild(layer.element);
    };
};
