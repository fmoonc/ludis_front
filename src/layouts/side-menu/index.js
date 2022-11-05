import dom from "@left4code/tw-starter/dist/js/dom";

// Setup side menu
const findActiveMenu = (subMenu, location) => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((location.forceActiveMenu !== undefined &&
        item.pathname === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined &&
          item.pathname === location.pathname)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu, location) => {
  menu.forEach((item, key) => {
    if (typeof item !== "string") {
      let menuItem = menu[key];
      menuItem.active =
        ((location.forceActiveMenu !== undefined &&
          item.pathname === location.forceActiveMenu) ||
          (location.forceActiveMenu === undefined &&
            item.pathname === location.pathname) ||
          (item.subMenu && findActiveMenu(item.subMenu, location))) &&
        !item.ignore;

      if (item.subMenu) {
        menuItem.activeDropdown = findActiveMenu(item.subMenu, location);
        menuItem = {
          ...item,
          ...nestedMenu(item.subMenu, location),
        };
      }
    }
  });

  return menu;
};

const linkTo = (menu, navigate) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    navigate(menu.pathname);
  }
};

/* const searchMenuActive = (menu) => {
  for (const item of menu) {
    if (item.active || item.activeDropdown) {
      if (item.subMenu) {
        for (const subItem of item.subMenu) {
          if (subItem.active) {
            if (subItem.subMenu) {
              for (const subSubItem of subItem.subMenu) {
                if (subSubItem.active) {
                  return subSubItem.title;
                }
              }
            }else{
              return subItem.title;
            }
          }
        }
      }else{
        return item.title;
      }
    }
  }
  return "title not found";
}; */

const enter = (el, done) => {
  dom(el).slideDown(300);
};

const leave = (el, done) => {
  dom(el).slideUp(300);
};

export { nestedMenu, linkTo, enter, leave };
