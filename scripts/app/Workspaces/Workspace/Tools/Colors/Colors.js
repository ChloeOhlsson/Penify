class Colors {
    primary = "black";
    secondary = "white";

    active = false;

    constructor(workspace) {
        this.workspace = workspace;

        this.item = document.createElement("li");
        this.item.innerHTML = `
            <button class="dark">
                <div class="tools-colors">
                    <div class="tools-colors-secondary"></div>
                    <div class="tools-colors-primary"></div>
                </div>
            </button>
        `;

        this.item.addEventListener("click", (event) => {
            this.show();
        });

        this.workspace.tools.element.appendChild(this.item);

        

        this.element = document.createElement("div");
        this.element.classList.add("dialog");
        this.element.classList.add("colors");
        this.element.innerHTML = `
            <div class="dialog-header">
                <div class="dialog-header-title">Colors</div>
            
                <div class="dialog-header-buttons">
                    <button class="dark close"><i class="fas fa-times"></i></button>
                </div>
            </div>

            <div class="dialog-container"></div>
        `;

        this.workspace.dialogs.appendChild(this.element);
    };

    show() {
        if(this.active)
            return this.hide();

        this.active = true;

        this.element.classList.add("active");
    };
    
    hide() {
        this.active = false;

        this.element.classList.remove("active");
    };
};
