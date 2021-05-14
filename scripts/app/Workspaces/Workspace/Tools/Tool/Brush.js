class Brush extends Tool {
    name = "Brush";
    icon = "fas fa-paint-brush";

    hideCursor = true;

    properties = { "preview": "preview", "size": "size", "mode": "blend" };

    size = 20;
    mode = "source-over";

    constructor(workspace) {
        super(workspace);

        this.cursorCanvas = document.createElement("canvas");
        this.cursor.appendChild(this.cursorCanvas);
    };

    change(key, value) {
        super.change(key, value);

        this.cursorCanvas.width = this.cursorCanvas.height = this.size + 4;
        this.cursorContext = this.cursorCanvas.getContext("2d");
        this.cursorContext.strokeStyle = "#CACACA";
        this.cursorContext.arc(this.size / 2 + 2, this.size / 2 + 2, this.size / 2, 0, 2 * Math.PI);
        this.cursorContext.stroke();
    };

    select(element) {
        super.select(element);

        this.context = this.workspace.layers.active.context;
    };

    mouseEnter(event, left, top) {
        super.mouseEnter(event, left, top);
    };

    mouseDown(event, left, top) {
        super.mouseDown(event, left, top);

        this.workspace.history.add();
        this.workspace.layers.active.save();
        
        this.path = new Path2D();

        this.path.moveTo(left + .5, top);
        this.path.lineTo(left + .5, top - .5);

        this.render();
    };

    mouseMove(event, left, top, down) {
        super.mouseMove(event, left, top, down);

        if(down) {
            this.path.lineTo(left + .5, top - .5);

            this.render();
        }
    };

    mouseUp(event, left, top) {
        super.mouseUp(event, left, top);

        this.path.lineTo(left + .5, top - .5);

        this.render();

        this.workspace.layers.active?.render();
    };

    mouseLeave(event, left, top) {
        super.mouseLeave(event, left, top);
    };

    render() {
        this.workspace.layers.active.restore();

        this.context.save();
            
        this.context.lineWidth = this.size;
        this.context.lineJoin = this.context.lineCap = "round";
        this.context.globalCompositeOperation = this.mode;

        this.context.stroke(this.path);

        this.context.restore();
    };

    unselect() {
        super.unselect();
    };
};
