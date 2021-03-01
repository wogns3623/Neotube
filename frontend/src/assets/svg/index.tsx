import { home } from "./home";
import { logo } from "./logo";
import { menu } from "./menu";
import { mic } from "./mic";
import { make } from "./make";
import { search } from "./search";
import { upload } from "./upload";
import { notice } from "./notice";
import { arrowDown } from "./arrow";

export const svgList = {
  home: home,
  logo: logo,
  menu: menu,
  mic: mic,
  make: make,
  search: search,
  upload: upload,
  notice: notice,
  arrowDown: arrowDown,
};

export type SvgEnum =
  | "home"
  | "logo"
  | "menu"
  | "mic"
  | "make"
  | "upload"
  | "notice"
  | "search"
  | "arrowDown";
