import { home } from "./home";
import { logo } from "./logo";
import { menu } from "./menu";
import { mic } from "./mic";
import { make } from "./make";
import { search } from "./search";
import { upload } from "./upload";
import { notice } from "./notice";
import { arrowDown, arrowUp } from "./arrow";
import { addList } from "./addList";
import { lastView } from "./lastView";
import { hiddenMenu } from "./hiddenMenu";
import { logout } from "./logout";

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
  arrowUp: arrowUp,
  addList: addList,
  lastView: lastView,
  hiddenMenu: hiddenMenu,
  logout: logout,
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
  | "arrowDown"
  | "arrowUp"
  | "addList"
  | "lastView"
  | "hiddenMenu"
  | "logout";
