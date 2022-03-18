import { Setting } from "obsidian";

import type SpectrumCompanion from "./Plugin";
import type { CustomSetting, CustomSettings, SliderSetting } from "./types";

export class SettingGenerator {
  public plugin: SpectrumCompanion;

  public constructor(plugin: SpectrumCompanion) {
    this.plugin = plugin;
  }

  public generateSettings(
    settings: CustomSettings,
    container: HTMLElement
  ): void {
    settings.forEach((setting) => {
      switch (setting.type) {
        case "dropdown":
          this.generateDropdownSetting(setting, container);
          break;
        case "toggle":
          this.generateToggleSetting(setting, container);
          break;
        case "slider":
          this.generateSliderSetting(setting, container);
          break;
        default:
          break;
      }
    });
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

  public generateToggleSetting(
    settings: CustomSetting,
    container: HTMLElement
  ): void {
    new Setting(container)
      .setName(settings.name)
      .setDesc(settings.description)
      .addToggle((toggle) => {
        const customToggle = toggle;

        customToggle.setValue(this.plugin.settings[settings.key]);
        customToggle.onChange(async (value) => {
          this.plugin.changeSettingProperty(settings.key, value);
          await this.plugin.saveSettings();
        });

        return customToggle;
      });
  }

  public generateSliderSetting(
    setting: SliderSetting,
    container: HTMLElement
  ): void {
    new Setting(container)
      .setName(setting.name)
      .setDesc(setting.description)
      .addSlider((slider) => {
        const customSlider = slider;

        customSlider.setValue(this.plugin.settings[setting.key]);
        customSlider.setLimits(setting.min, setting.max, setting.step);
        customSlider.onChange(async (value) => {
          this.plugin.changeSettingProperty(setting.key, value);
          await this.plugin.saveSettings();
        });

        return customSlider;
      });
  }
}
