class Eraser extends Tool {
    name = "Eraser";
    icon = "fas fa-eraser";

    hideCursor = true;

    properties = { "preview": "preview", "size": "size" };

    size = 20;
    mode = "destination-out";

    constructor(workspace) {
        super(workspace);

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.cursor.appendChild(this.canvas);
    };

    change(key, value) {
        super.change(key, value);

        this.canvas.width = this.canvas.height = this.size + 4;
        
        this.context.strokeStyle = "#CACACA";
        this.context.arc(this.size / 2 + 2, this.size / 2 + 2, this.size / 2, 0, 2 * Math.PI);
        this.context.stroke();
    };

    select(element) {
        super.select(element);
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

        if(left != null && top != null)
            this.path.lineTo(left + .5, top - .5);

        this.render();
    };

    mouseLeave(event, left, top) {
        super.mouseLeave(event, left, top);
    };

    render() {
        this.workspace.layers.active.restore();

        const context = this.workspace.layers.active.context;

        context.save();
            
        context.lineWidth = this.size;
        context.lineJoin = context.lineCap = "round";
        context.globalCompositeOperation = this.mode;

        context.stroke(this.path);

        this.workspace.layers.active.render();

        context.restore();
    };

    unselect() {
        super.unselect();
    };
};
