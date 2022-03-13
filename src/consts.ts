import type { CustomCommands, CustomSettings, PluginSettings } from "./types";

export const defaultSettings: PluginSettings = {
  scheme: "default-spectrum",
  hue: 0,
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

export const schemeSettings: CustomSettings = [
  {
    name: "Change Colour Scheme",
    description: "Change the colour scheme of the Spectrum Theme",
    id: "change-colour-scheme",
    key: "scheme",
    options: schemes,
  },
];
