import type { App, PluginManifest } from "obsidian";
import { Plugin } from "obsidian";

import { CommandGenerator } from "./CommandGenerator";
import { SpectrumSettingTab } from "./Settings";
import { defaultSettings, schemes, commands } from "./consts";
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

    this.generator.generateCommands(commands);
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

  public updateHue(): void {
    const { hue } = this.settings;
    const { body } = document;

    body.style.setProperty("--spectrum-hue", `${hue}`);
  }

  public toggleSideDocks(): void {
    const sideDocks = this.settings["side-docks"];
    const { body } = document;

    body.style.setProperty(
      "--spectrum-side-docks",
      sideDocks ? "1 1 30px" : "1 1 0"
    );
  }

  public checkForUpdate(key: PluginKeys): void {
    switch (key) {
      case "scheme":
        this.updateScheme();
        break;
      case "hue":
        this.updateHue();
        break;
      case "side-docks":
        this.toggleSideDocks();
        break;
      default:
        break;
    }
  }

  public changeSettingProperty(
    key: PluginKeys,
    value: PluginSettings[typeof key]
  ): void {
    this.settings[key] = value;
    this.saveSettings();

    this.checkForUpdate(key);
  }
}
