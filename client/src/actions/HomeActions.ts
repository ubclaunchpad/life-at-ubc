export const SWITCHCOMPONENT = "switch_component";

export interface Switch {
  type: typeof SWITCHCOMPONENT;
  index: number;
}

export type HomeActions = Switch;
