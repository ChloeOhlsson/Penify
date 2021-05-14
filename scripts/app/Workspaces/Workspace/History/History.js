class History extends WorkspaceItem {
    constructor(workspace) {
        super(workspace);

        this.element = document.createElement("div");
        this.element.classList.add("dialog");
        this.element.innerHTML = `
            <div class="dialog-header">
                <div class="dialog-header-title">History</div>
            </div>

            <div class="dialog-container"></div>
        `;

        this.container = this.element.querySelector(".dialog-container");
        
        this.workspace.right.appendChild(this.element);
    };

    add(tool = this.workspace.tools.active) {
        const layer = this.workspace.layers.active;

        if(layer == undefined)
            return;
        
        const element = document.createElement("div");
        element.classList.add("history");
        element.innerHTML = `
            <div class="history-icon"><i class="${tool.icon}"></i></div>

            <div class="history-name">${tool.name}</div>

            <div class="history-buttons">
                <button class="history-revert"><i class="fas fa-history"></i></button>
            </div>
        `;
        
        const history = {
            element,
            canvas: layer.canvas.toDataURL()
        };

        element.querySelector(".history-revert").addEventListener("click", (event) => {
            for(let index = 0; index < layer.histories.length; index++)
                layer.histories[index].element.classList.remove("active");

            const historyIndex = layer.histories.indexOf(history);

            for(let index = layer.histories.length - 1; index >= historyIndex; index--)
                layer.histories[index].element.classList.add("active");

            this.add({
                icon: "fas fa-history",
                name: "Revert"
            });

            layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);

            const image = new Image();

            image.onload = (event) => {
                layer.context.drawImage(image, 0, 0);
            };

            image.src = history.canvas;
        });

        layer.histories.push(history);
        layer.history.appendChild(element);

        this.container.scrollTop = this.container.scrollHeight;
    };
};
