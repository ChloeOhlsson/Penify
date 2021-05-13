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

            <div class="dialog-container">
                <div class="layer">
                    <div class="layer-thumbnail"></div>

                    <div class="layer-name">Unnamed layer</div>

                    <div class="layer-buttons">
                        <button><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        this.workspace.right.appendChild(this.element);
    };
};
