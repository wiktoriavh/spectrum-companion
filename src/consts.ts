import type { CustomCommands, CustomSettings, PluginSettings } from "./types";

export const defaultSettings: PluginSettings = {
  scheme: "default-spectrum",
  hue: 0,
  "side-docks": false,
};

export const schemes: CustomCommands = [
  {
    id: "default-spectrum",
    name: "Default Spectrum",
    key: "scheme",
  },
  {
    id: "monochrome-spectrum",
    name: "Monochrome Spectrum",
    key: "scheme",
  },
];

export const hue: CustomCommands = [
  {
    id: "change-hue",
    name: "Change Hue",
    key: "hue",
  },
];

export const toggleRibbon: CustomCommands = [
  {
    id: "toggle-side-docks",
    name: "Toggle Side Docks",
    key: "side-docks",
    hotkeys: [{ modifiers: ["Mod", "Alt"], key: "y" }],
  },
];

export const commands = [...schemes, ...toggleRibbon];

export const customSettings: CustomSettings = [
  {
    name: "Change Colour Scheme",
    description: "Change the colour scheme of the Spectrum Theme",
    id: "change-colour-scheme",
    key: "scheme",
    options: schemes,
    type: "dropdown",
  },
  {
    name: "Change Hue",
    description: "Change the hue for the Spectrum Monochrome Theme",
    id: "change-hue",
    key: "hue",
    type: "slider",
    min: 0,
    max: 360,
    step: 1,
  },
  {
    name: "Toggle Side Docks",
    description: "Toggle the side docks",
    id: "toggle-side-docks",
    key: "side-docks",
    options: toggleRibbon,
    type: "toggle",
  },
];
