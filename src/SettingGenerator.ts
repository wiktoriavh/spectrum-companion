import { Setting } from "obsidian";

import type SpectrumCompanion from "./Plugin";
import type { CustomSetting, CustomSettings } from "./types";

export class SettingGenerator {
  public plugin: SpectrumCompanion;

  public constructor(plugin: SpectrumCompanion) {
    this.plugin = plugin;
  }

  public generateDropdownSetting(
    settings: CustomSetting,
    container: HTMLElement
  ): void {
    new Setting(container)
      .setName(settings.name)
      .setDesc(settings.description)
      .addDropdown((dropdown) => {
        const customDropdown = dropdown;

        settings.options.forEach((option) => {
          customDropdown.addOption(option.id, option.name);
        });

        customDropdown.setValue(this.plugin.settings[settings.key]);
        customDropdown.onChange(async (value) => {
          this.plugin.changeSettingProperty(settings.key, value);
          await this.plugin.saveSettings();
        });

        return customDropdown;
      });
  }

  public generateSettings(
    settings: CustomSettings,
    typeOfSetting: string,
    container: HTMLElement
  ): void {
    switch (typeOfSetting) {
      case "dropdown":
        settings.forEach((setting) => {
          this.generateDropdownSetting(setting, container);
        });
        break;
      default:
        break;
    }
  }
}
