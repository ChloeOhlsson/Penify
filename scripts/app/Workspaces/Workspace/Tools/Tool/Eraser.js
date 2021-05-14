class Eraser extends Tool {
    name = "Eraser";
    icon = "fas fa-eraser";

    hideCursor = true;

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

        this.context = this.workspace.layers.active.context;
    };

    mouseEnter(event, left, top) {
        super.mouseEnter(event, left, top);
    };

    mouseDown(event, left, top) {
        super.mouseDown(event, left, top);

        this.workspace.history.add();

        this.workspace.layers.active.save();

        this.context.save();
        
        this.context.lineWidth = 20;
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.globalCompositeOperation = "destination-out";
        
        this.context.beginPath();

        this.context.moveTo(left + .5, top);
        this.context.lineTo(left + .5, top - .5);

        this.context.stroke();
    };

    mouseMove(event, left, top, down) {
        super.mouseMove(event, left, top, down);

        if(down) {
            this.context.lineTo(left + .5, top - .5);

            this.context.stroke();
        }
    };

    mouseUp(event, left, top) {
        super.mouseUp(event, left, top);

        this.context.lineTo(left + .5, top - .5);
        this.context.stroke();

        this.context.restore();

        this.workspace.layers.active?.render();
    };

    mouseLeave(event, left, top) {
        super.mouseLeave(event, left, top);
    };

    unselect() {
        super.unselect();
    };
};
