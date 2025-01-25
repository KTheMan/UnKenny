import { loadExternalModule } from './shared.js';

function roughNumberOfTokensForOpenAi(messages) {
    const charsPerToken = 4;
    let chars = 0;
    for (const message of messages) {
        chars += message.role.length;
        chars += message.content.length;
    }
    return chars / charsPerToken;
}

async function getResponseFromOpenAI(parameters, messages) {
    const OpenAIModule = await loadExternalModule('openai');
    if (!OpenAIModule) {
        return;
    }
    const OpenAi = OpenAIModule.default;

    const openai = new OpenAi({
        apiKey: parameters.apiKey,
        dangerouslyAllowBrowser: true,
    });

    const input_parameters = {
        model: parameters.model,
        messages: messages,
        max_tokens: parameters.maxNewTokens,
        temperature: parameters.temperature,
        frequency_penalty: parameters.repetitionPenalty,
    };
    try {
        const chatCompletion = await openai.chat.completions.create(input_parameters);
        return chatCompletion['choices'][0]['message']['content'];
    } catch (error) {
        const errorMessage = game.i18n.format('unkenny.llm.openAiError', { error: error });
        ui.notifications.error(errorMessage);
        return;
    }
}

async function getResponseFromOllama(parameters, messages) {
    try {
        const response = await fetch(`${parameters.ollamaEndpoint}/generate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${parameters.ollamaApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: parameters.model,
                messages: messages,
                max_tokens: parameters.maxNewTokens,
                temperature: parameters.temperature,
                frequency_penalty: parameters.repetitionPenalty
            })
        });
        if (!response.ok) {
            throw new Error(`Failed to generate response: ${response.statusText}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        const errorMessage = game.i18n.format('unkenny.llm.ollamaError', { error: error.message });
        ui.notifications.error(errorMessage);
        return;
    }
}

export { getResponseFromOpenAI, roughNumberOfTokensForOpenAi, getResponseFromOllama };
