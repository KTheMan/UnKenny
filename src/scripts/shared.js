const loadedModules = {}

async function isUnKenny(actor) {
    if (!actor) {
        const errorMessage = game.i18n.localize("unkenny.shared.unkenninessForNull");
        ui.notifications.error(errorMessage);
        return false;
    }
    let alias = await actor.getFlag("unkenny", "alias");
    return !!alias;
}

function isTestEnvironment() {
    if (typeof process === 'undefined') {
        return false;
    }
    return process.env.NODE_ENV === 'test';
}

async function loadExternalModule(name) {
    if (loadedModules[name]) {
        return loadedModules[name];
    }
    try {
        let nameForUrl = name;
        if (nameForUrl == "openai") {
            nameForUrl += "/+esm";
        }
        loadedModules[name] = await import('https://cdn.jsdelivr.net/npm/' + nameForUrl);
        return loadedModules[name];
    } catch (error) {
        if (isTestEnvironment()) {
            try {
                return await import(name);
            } catch (localError) {
                const errorMessage = game.i18n.format("unkenny.shared.moduleLoadFailed", { name: name, error: error });
                console.error(errorMessage);
                return;
            }
        } else {
            const errorMessage = game.i18n.format("unkenny.shared.moduleLoadFailed", { name: name, error: error });
            ui.notifications.error(errorMessage);
            return;
        }
    }
}

async function fetchOllamaModels(endpoint, apiKey) {
    try {
        const response = await fetch(`${endpoint}/models`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.statusText}`);
        }
        const data = await response.json();
        return data.models;
    } catch (error) {
        const errorMessage = game.i18n.format("unkenny.shared.ollamaFetchFailed", { error: error.message });
        ui.notifications.error(errorMessage);
        return [];
    }
}

export { isUnKenny, loadExternalModule, fetchOllamaModels };
