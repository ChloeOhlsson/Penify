class Layer {
    name = "Unnamed layer";

    constructor(workspace) {
        this.workspace = workspace;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.workspace.width;
        this.canvas.height = this.workspace.height;

        this.context = this.canvas.getContext("2d");

        this.workspace.content.appendChild(this.canvas);

        this.histories = [];

        this.history = document.createElement("div");
    };

    render() {
        const canvas = this.element.querySelector(".layer-thumbnail");
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(this.canvas, 0, 0);
    };
};
