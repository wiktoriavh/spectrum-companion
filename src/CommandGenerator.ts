import type { Command } from "obsidian";

import type SpectrumCompanion from "./Plugin";
import type { CustomCommands, PluginKeys } from "./types";

export class CommandGenerator {
  public plugin;

  public constructor(plugin: SpectrumCompanion) {
    this.plugin = plugin;
  }

  public generateCommandObject(options: Command, key: PluginKeys): Command {
    return {
      ...options,
      callback: () => {
        this.plugin.changeSettingProperty(key, options.id);
      },
    };
  }

  public generateCommands(commands: CustomCommands): void {
    commands.forEach((command) => {
      const { key } = command;
      this.plugin.addCommand(this.generateCommandObject(command, key));
    });
  }
}
