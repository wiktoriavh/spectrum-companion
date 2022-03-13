import type { App, PluginManifest } from "obsidian";
import { Plugin } from "obsidian";

import { CommandGenerator } from "./CommandGenerator";
import { SpectrumSettingTab } from "./Settings";
import { defaultSettings, schemes } from "./consts";
import type { PluginSettings, PluginKeys } from "./types";

// eslint-disable-next-line import/no-default-export
export default class SpectrumCompanion extends Plugin {
  public settings: PluginSettings;

  public generator: CommandGenerator;

  public constructor(app: App, plugin: PluginManifest) {
    super(app, plugin);
    this.generator = new CommandGenerator(this);
  }

  public async onload(): Promise<void> {
    await this.loadSettings();

    this.addSettingTab(new SpectrumSettingTab(this.app, this));

    this.generator.generateCommands(schemes);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onunload(): void {} // EMPTY

  public async loadSettings(): Promise<void> {
    this.settings = { ...defaultSettings, ...(await this.loadData()) };
  }

  public async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  public updateScheme(): void {
    schemes.forEach((scheme) => {
      document.body.classList.remove(scheme.id);
    });
    document.body.classList.add(this.settings.scheme);
  }

  public checkForUpdate(key: PluginKeys): void {
    switch (key) {
      case "scheme":
        this.updateScheme();
        break;
      default:
        break;
    }
  }

  public changeSettingProperty(key: PluginKeys, value: string): void {
    this.settings[key] = value;

    this.checkForUpdate(key);
  }
}