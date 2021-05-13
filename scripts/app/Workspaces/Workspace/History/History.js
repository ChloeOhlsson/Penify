class History extends WorkspaceItem {
    constructor(workspace) {
        super(workspace);

        this.element = document.createElement("div");
        this.element.classList.add("dialog");
        this.element.innerHTML = `
            <div class="dialog-header">
                <div class="dialog-header-title">History</div>
            
                <div class="dialog-header-buttons">
                    <button class="dark"><i class="fas fa-plus"></i></button>
                </div>
            </div>

            <div class="dialog-container">
                <div class="history">
                    <div class="history-icon"><i class="fas fa-pencil-alt"></i></div>

                    <div class="history-name">Pen</div>

                    <div class="history-buttons">
                        <button><i class="fas fa-history"></i></button>
                    </div>
                </div>
                </div>
            </div>
        `;
        
        this.workspace.right.appendChild(this.element);
    };
};
