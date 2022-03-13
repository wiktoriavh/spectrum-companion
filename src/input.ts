import {
  App,
  Workspace,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from "obsidian";

import type { MyPluginSettings } from "./defaultSettings";
import { DEFAULT_SETTINGS } from "./defaultSettings";

export default class SpectrumCompanion extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    console.log("onload", this.settings);

    this.addSettingTab(new SpectrumSettingTab(this.app, this));

    this.addCommand({
      id: "monochrome",
      name: "Monochrome",
      callback: this.addClassNameToBody,
    });
  }

  onunload() {
    /* EMPTY */
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  addClassNameToBody() {
    console.log("addClassNameToBody", this.settings);
    document.body.classList.add(this.settings.mySetting);
  }
}

class SpectrumSettingTab extends PluginSettingTab {
  plugin: SpectrumCompanion;

  constructor(app: App, plugin: SpectrumCompanion) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl("h3", { text: "Spectrum Theme Settings" });

    new Setting(containerEl)
      .setName("Dropdown Title")
      .setDesc("Some description for the dropdown")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("some-value", "Some Value")
          .addOption("another-value", "Another Value")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
            this.plugin.addClassNameToBody();
          })
      );
  }
}
