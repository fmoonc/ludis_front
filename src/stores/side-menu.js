import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Dashboard",
      },
      "devider",
      {
        icon: "User",
        title: "Usuarios",
        subMenu: [
          {
            icon: "Users",
            pathname: "/usuarios",
            title: "Usuarios",
          },
          {
            icon: "Unlock",
            pathname: "/roles",
            title: "Roles",
          },
          {
            icon: "Info",
            pathname: "/actividad",
            title: "Actividad",
          },
        ],
      },
      /* "devider",
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
      }, */
    ],
  },
});

export { sideMenu };
