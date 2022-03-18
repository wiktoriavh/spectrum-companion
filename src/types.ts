export type PluginSettings = {
  scheme: Scheme;
  hue: number;
  "side-docks": boolean;
};

export type PluginKeys = keyof PluginSettings;

export type Scheme = "default-spectrum" | "monochrome-spectrum";

export type HotkeyModifiers = "Alt" | "Mod" | "Shift";

export type CustomCommand = {
  id: string;
  name: string;
  key: PluginKeys;
  hotkeys?: [{ modifiers: HotkeyModifiers[]; key: string }];
};

export type CustomCommands = CustomCommand[];
export type OnSelectCommand = (id: string) => void;

export type CustomSetting = {
  name: string;
  description: string;
  key: PluginKeys;
  id: string;
  options: CustomCommand[];
  type: "dropdown" | "toggle";
};

export type SliderSetting = {
  name: string;
  description: string;
  key: PluginKeys;
  id: string;
  min: number;
  max: number;
  step: number;
  type: "slider";
};

export type CustomSettings = (CustomSetting | SliderSetting)[];
