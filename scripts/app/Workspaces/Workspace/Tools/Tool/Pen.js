class Pen extends Tool {
    name = "Pen";
    icon = "fas fa-pencil-alt";

    hideCursor = true;

    constructor(workspace) {
        super(workspace);

        this.cursor.innerHTML = `<i class="${this.icon}"></i>`;
    };

    select() {
        super.select();
    };

    mouseEnter(event, left, top) {
        super.mouseEnter(event, left, top);
    };

    mouseMove(event, left, top) {
        super.mouseMove(event, left, top);
    };

    mouseLeave(event) {
        super.mouseLeave(event);
    };

    unselect() {
        super.unselect();
    };
};
