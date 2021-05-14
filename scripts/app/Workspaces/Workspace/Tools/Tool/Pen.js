class Pen extends Tool {
    name = "Pen";
    icon = "fas fa-pencil-alt";

    hideCursor = true;

    properties = { "preview": "preview", "size": "size", "blend": "blend" };

    size = 1;
    blend = "source-over";

    constructor(workspace) {
        super(workspace);

        this.cursor.innerHTML = `<i class="${this.icon}"></i>`;
    };

    select(element) {
        super.select(element);

        this.context.restore();
    };

    mouseEnter(event, left, top) {
        super.mouseEnter(event, left, top);
    };

    mouseDown(event, left, top) {
        super.mouseDown(event, left, top);

        this.workspace.history.add();
        
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.beginPath();

        this.context.moveTo(left + .5, top);
        this.context.lineTo(left + .5, top - .5);

        this.context.stroke();
    };

    mouseMove(event, left, top, down) {
        super.mouseMove(event, left, top, down);

        if(down) {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            this.context.lineTo(left + .5, top - .5);

            this.context.stroke();
        }
    };

    mouseUp(event, left, top) {
        super.mouseUp(event, left, top);

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.context.lineTo(left + .5, top - .5);
        this.context.stroke();

        this.workspace.layers.active?.context.drawImage(this.context.canvas, 0, 0);
        this.workspace.layers.active?.render();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    mouseLeave(event, left, top) {
        super.mouseLeave(event, left, top);
    };

    unselect() {
        super.unselect();
    };
};
