class Workspaces {
    static element = document.getElementById("workspaces");
    static tabs = document.getElementById("workspaces-tabs");

    static active = null;

    static add(workspace) {
        this.tabs.appendChild(workspace.tab);
        this.element.appendChild(workspace.element);
    };

    static create() {
        const workspace = new Workspace();
        Workspaces.add(workspace);
        Workspaces.focus(workspace);
    };

    static focus(workspace) {
        this.active?.tab.classList.remove("active");
        this.active?.element.classList.remove("active");

        this.active = workspace;

        this.active.tab.classList.add("active");
        this.active.element.classList.add("active");
    };

    static remove(workspace) {
        workspace.tab.remove();
        workspace.element.remove();
    };
};

App.addStep(function(resolve) {
    document.getElementById("header-workspaces-new").addEventListener("click", Workspaces.create);

    resolve();
});

App.addStep(function(resolve) {
    Workspaces.create();

    resolve();
});
