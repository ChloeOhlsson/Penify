class Pen extends Tool {
    name = "Pen";
    icon = "fas fa-pencil-alt";

    hideCursor = true;

    properties = { "preview": "preview", "size": "size", "mode": "blend" };

    size = 1;
    mode = "source-over";

    constructor(workspace) {
        super(workspace);

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.cursor.appendChild(this.canvas);
    };

    change(key, value) {
        super.change(key, value);
    
        if(this.size == 1) {
            this.canvas.width = this.canvas.height = 2;

            this.context.rect(1.5, 1.5, 1, 1);
        }
        else {
            this.canvas.width = this.canvas.height = this.size + 2;

            this.context.rect(0.5, 0.5, this.size + 1, this.size + 1);
        }
        
        this.context.lineWidth = 1;
        this.context.strokeStyle = "#CACACA";
        
        this.context.stroke();
    };

    select(element) {
        super.select(element);
    };

    mouseEnter(context, event, left, top) {
        super.mouseEnter(context, event, left, top);
    };

    mouseDown(context, event, left, top) {
        super.mouseDown(context, event, left, top);

        this.workspace.history.add();
        this.workspace.layers.active.save();
        
        this.path = [
            { left, top }
        ];

        this.render(context);
    };

    mouseMove(context, event, left, top, down) {
        super.mouseMove(context, event, left, top, down);

        if(down) {
            this.path.push({ left, top });

            this.render(context);
        }
    };

    mouseUp(context, event, left, top) {
        super.mouseUp(context, event, left, top);

        if(left != null && top != null)
            this.path.push({ left, top });

        this.render(context);
    };

    mouseLeave(context, event, left, top) {
        super.mouseLeave(context, event, left, top);
    };

    render(context) {
        this.workspace.layers.active.restore();

        context.save();

        context.lineWidth = this.size;

        for(let index = 0; index < this.path.length - 1; index++)
            context.bresenhamLine(this.path[index].left, this.path[index].top, this.path[index + 1].left, this.path[index + 1].top);

        this.workspace.layers.active.render();

        context.restore();
    };

    unselect() {
        super.unselect();
    };
};
