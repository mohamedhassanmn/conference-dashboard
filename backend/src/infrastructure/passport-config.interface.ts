import { PassportStatic } from "passport";

export interface IPassportConfig {
  init(passport: PassportStatic): void;
}
