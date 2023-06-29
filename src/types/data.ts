export interface Creator {
  favorited: number;
  id: string;
  indexed: number;
  name: string;
  service: Service;
  updated: number;
}

export type ServiceKemono =
  | "patreon"
  | "fanbox"
  | "discord"
  | "fantia"
  | "afdian"
  | "boosty"
  | "dlsite"
  | "gumroad"
  | "subscribestar";
export type ServiceCoomer = "onlyfans" | "fansly";

export type Service = ServiceKemono | ServiceCoomer;

export enum ServiceEnum {
  patreon = "Patreon",
  fanbox = "Pixiv Fanbox",
  discord = "Discord",
  fantia = "Fantia",
  afdian = "Afdian",
  boosty = "Boosty",
  dlsite = "DLsite",
  gumroad = "Gumroad",
  subscribestar = "SubscribeStar",
  onlyfans = "OnlyFans",
  fansly = "Fansly",
}
