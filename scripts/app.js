class App {
    static title = document.title;

    static resolveScript(resolve) {
        App.configuration.scripts.shift();

        App.loadScript(resolve);
    };

    static loadScript(resolve) {
        if(App.configuration.scripts.length == 0)
            return resolve();

        const element = document.createElement("script");
        element.onload = () => App.resolveScript(resolve);
        element.src = "scripts/app/" + App.configuration.scripts[0];

        document.body.appendChild(element);
    };

    static steps = [];

    static addStep(func) {
        App.steps.push(func);
    };

    static resolveStep(resolve) {
        App.steps.shift();

        App.start(resolve);
    };

    static start(resolve) {
        if(App.steps.length == 0)
            return resolve();

        App.steps[0](() => App.resolveStep(resolve));
    };
};

App.addStep(async function(resolve) {
    const response = await fetch("scripts/app.json");

    App.configuration = await response.json();

    resolve();
});

App.addStep(App.loadScript);

App.start(function() {
    
});
