export type PluginSettings = {
  scheme: Scheme;
  hue: number;
};

export type PluginKeys = keyof PluginSettings;

export type Scheme = "default-spectrum" | "monochrome-spectrum";

export type CustomCommand = { id: string; name: string; key: PluginKeys };
export type CustomCommands = CustomCommand[];
export type OnSelectCommand = (id: string) => void;

export type CustomSetting = {
  name: string;
  description: string;
  key: PluginKeys;
  id: string;
  options: CustomCommand[];
};
export type CustomSettings = CustomSetting[];
