class Tool {
    name = "???";
    icon = "fas fa-question";

    constructor(workspace) {
        this.workspace = workspace;
    };

    select() {

    };

    unselect() {

    };
};

class Tools {
    constructor(workspace) {
        this.workspace = workspace;

        this.element = document.createElement("ul");
        this.element.classList.add("tools");

        this.workspace.left.appendChild(this.element);
    };

    add(tool) {
        tool.element = document.createElement("li");
        tool.element.innerHTML = `<button class="dark"><i class="${tool.icon}"></i></button></li>`;
        tool.element.addEventListener("click", (event) => {
            this.select(tool);
        });

        if(this.active == undefined)
            this.select(tool);

        this.element.appendChild(tool.element);
    };

    select(tool) {
        this.active?.unselect();

        this.active?.element.classList.remove("active");

        if(this.active != tool) {
            this.active = tool;

            this.active.element.classList.add("active");

            this.active.select();
        }
        else
            delete this.active;
    };
};
