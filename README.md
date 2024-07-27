# UnKenny - NPCs with artificial intelligence

## About

UnKenny is a module for [Foundry Virtual Tabletop](https://foundryvtt.com/). It allows you to generate a tiny dialogue with a character, by providing them with a limited AI. The idea arose during our Starfinder game, because we wanted to simulate the interaction with a robotical NPC.

## Security

__Be mindful which modules you enable.__

If you are storing your OpenAI API key in UnKenny, you are entrusting it to us, and by extension, to FoundryVTT. The modularity of Foundry is one of its big selling points, but it is also an invitation to arbitrary code execution. Any module you install could, in principle, inject some code that steals your API key. Foundry takes some countermeasures like scoping of modules, but ultimately it is very hard to defend against attacks from within your application.

For that reason, monitor your API key usage every now and then. If ever you find a module that has stolen your key, please
* [Revoke your key.](https://help.openai.com/en/articles/4936817-i-see-suspicious-activity-on-my-account-what-do-i-do)
* [Report it to FoundryVTT.](https://foundryvtt.com/contact-us/)
* [Contact us.](mailto:thecomamba@jojoheinze.de)

## Usage

### Global Configuration

After enabling the module for a world, configure it in the global settings. Selecting a [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) is required. If you want to use one of OpenAI's models, you will also need to [set up and pay for an API key](https://blog.streamlit.io/beginners-guide-to-openai-api/). Note that different models may have different capabilties and also different usage costs.

The other parameters are set to reasonable defaults.

![UnKenny Game Settings](https://raw.githubusercontent.com/thecomamba/unkenny/main/img/game_settings.png)

### Actor Configuration

Open the sheet of the actor that you want to make UnKenny and click on "Modify UnKenniness".

![Actor Sheet](https://raw.githubusercontent.com/thecomamba/unkenny/main/img/actor_sheet.png)

Provide the following two inputs:
* __Alias__: An UnKenny alias to refer to the actor in chat messages. Only alphanumeric characters and underscores are allowed here.
* __Preamble__: This is a short description of what the character needs to know about themselves.

You may also overwrite any global settings for this actor only. If for example you want to have a particularly repetitive character, you could set the Repetition penalty to a negative value. However, most effects can also be achieved by accurately describing the character in the preamble.

![UnKenny Sheet](https://raw.githubusercontent.com/thecomamba/unkenny/main/img/unkenny_sheet.png)

### Adressing Actors

As long as the alias is not empty, the actor is considered *unkenny* and can be adressed. To speak to the actor, mention them anywhere in your message using `@<alias>`, where `<alias>` is their *UnKenny alias*.

Your chat message is posted, and a short while later, the response generated by the large language model is posted below it. This example was generated with the GPT-4 model.

![Dialogue](https://raw.githubusercontent.com/thecomamba/unkenny/main/img/chat_dialogue.png)

Any messages previously posted at or by the actor are included in the chat conversation and marked accordingly. They can individually be removed from the conversation via the context menu. Alternatively you can clear all messages from all conversations via the crossed out speech bubble button right above the input field.

Note that the context size of a large language model is limited. At some point UnKenny might warn you that it starts truncating messages. To avoid that, simply clean up the chat log. Alternatively you can switch to a model with a larger context size. For OpenAi, these are usually the ones ending on 'turbo'.

### Currently Supported Languages

- English
- German

## Contributing

Bug reports, feature requests and pull requests are all welcome.

If you want to add a new language, add a file called `src/lang/<new-lang>.json`, where `<new-lang>` is the corresponding [two-letter ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). In `src/module.json`, add a new entry in the `"languages"` array. Running `scripts/check_localizations_consistency.sh` will list all keys that are not translated into your language. It will also discover some typos.

If you develop a feature or fix a bug, please make sure that the behaviour is covered by tests. It may be necessary to expand the FoundryVTT mock contained in the `__mocks__` folder. Without thorough test coverage this module quickly becomes unmaintainable.

## Manual Installation

To manually install UnKenny (e.g. for development), copy the src/ folder of this repository to the {userData}/Data/modules/ folder of Foundry, and then rename it to 'unkenny' (the id declared in module.json).

On POSIX compliant operating systems like Linux and Mac you can alternatively use a symbolic link. It can be created via e.g.

```bash
ln -s {folder containing git repo}/UnKenny/src {Foundry user data}/Data/modules/unkenny
```

## License

This software is distributed under the [MIT](https://choosealicense.com/licenses/mit/) license. In a nutshell this means that all code is made public, and you are free to use it without any charge.

We do not provide any guarantees for the licenses under which the models are distributed. The local models have some open source licensing, OpenAI's models are proprietary.

## Acknowledgments

Some of the authors thank [CarinaKt](https://github.com/CarinaKt) for the ongoing fruitful discussions.

Some of the authors support #TeamEmilia.
