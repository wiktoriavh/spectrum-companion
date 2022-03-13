import type { App } from "obsidian";
import { PluginSettingTab } from "obsidian";

import type SpectrumCompanion from "./Plugin";
import { SettingGenerator } from "./SettingGenerator";
import { schemeSettings } from "./consts";

export class SpectrumSettingTab extends PluginSettingTab {
  public plugin: SpectrumCompanion;

  public generator;

  public constructor(app: App, plugin: SpectrumCompanion) {
    super(app, plugin);
    this.plugin = plugin;
    this.generator = new SettingGenerator(this.plugin);
  }

  public display(): void {
    const { containerEl, generator } = this;

    containerEl.empty();
    containerEl.createEl("h3", { text: "Spectrum Theme Settings" });

    generator.generateSettings(schemeSettings, "dropdown", containerEl);
  }
}
