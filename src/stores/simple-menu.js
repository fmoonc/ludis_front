import { atom } from "recoil";

const simpleMenu = atom({
  key: "simpleMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/simple-menu/dashboard",
        title: "Dashboard",
      },
      "devider",
      {
        icon: "User",
        title: "Usuarios",
        subMenu: [
          {
            icon: "Users",
            pathname: "/simple-menu/usuarios",
            title: "Usuarios",
          },
          {
            icon: "Unlock",
            pathname: "/simple-menu/roles",
            title: "Roles",
          },
          {
            icon: "Info",
            pathname: "/simple-menu/actividad",
            title: "Actividad",
          },
        ],
      },
      "devider",
      {
        icon: "Box",
        title: "Menu Layout",
        subMenu: [
          {
            icon: "",
            pathname: "/",
            title: "Side Menu",
            ignore: true,
          },
          {
            icon: "",
            pathname: "/simple-menu/dashboard",
            title: "Simple Menu",
            ignore: true,
          },
          {
            icon: "",
            pathname: "/top-menu/dashboard",
            title: "Top Menu",
            ignore: true,
          },
        ],
      },
    ],
  },
});

export { simpleMenu };
