import { InputType } from "@stocks-forecast/shared";

export interface Projection {
  year: number;
  value: number;
}

export interface Dataset {
  id: number;
  label: string;
  data: Projection[];
}

export type InputPatch = {
  [K in keyof InputType]?: NonNullable<InputType[K]> extends object
    ? Partial<NonNullable<InputType[K]>>
    : InputType[K];
};
