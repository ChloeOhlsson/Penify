class Brush extends Tool {
    name = "Brush";
    icon = "fas fa-paint-brush";

    hideCursor = false;

    constructor(workspace) {
        super(workspace);

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 20 + 4;

        const context = canvas.getContext("2d");
        context.strokeStyle = "#CACACA";
        context.arc(20 / 2 + 2, 20 / 2 + 2, 20 / 2, 0, 2 * Math.PI);
        context.stroke();

        this.cursor.appendChild(canvas);
    };

    select() {
        super.select();
        
        this.context.lineWidth = 20;
        this.context.lineJoin = this.context.lineCap = "round";
    };

    mouseEnter(event, left, top) {
        super.mouseEnter(event, left, top);
    };

    mouseDown(event, left, top) {
        super.mouseDown(event, left, top);
        
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

        this.workspace.history.add();

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
