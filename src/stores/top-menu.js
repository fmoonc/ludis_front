import { atom } from "recoil";

const topMenu = atom({
  key: "topMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/top-menu/dashboard",
        title: "Dashboard",
      },
      {
        icon: "User",
        title: "Usuarios",
        subMenu: [
          {
            icon: "Users",
            pathname: "/top-menu/usuarios",
            title: "Usuarios",
          },
          {
            icon: "Unlock",
            pathname: "/top-menu/roles",
            title: "Roles",
          },
          {
            icon: "Info",
            pathname: "/top-menu/actividad",
            title: "Actividad",
          },
        ],
      },
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

export { topMenu };
