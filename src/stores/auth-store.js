import { atom, selector } from "recoil";

export const authState = atom({
  key: "auth",
  default:
    localStorage.getItem("auth") && localStorage.getItem("auth") !== undefined
      ? JSON.parse(localStorage.getItem("auth"))
      : null,
});

export const authPermissionState = selector({
  key: "authPermissions",
  get: ({ get }) => {
    const userAuth = get(authState);
    const permissions = Object.assign([], userAuth?.user?.permissions ?? null);

    if (Array.isArray(permissions)) {
      permissions.push("panel.side.menu");
      permissions.push("panel.simple.menu");
      permissions.push("panel.top.menu");
    }
    return permissions;
  },
});

export const updateAuthUser = selector({
  key: "updateAuthUser",
  get: ({ get }) => {
    const userAuth = get(authState);
    return {
      id: userAuth?.user?.id ?? null,
      email: userAuth?.user?.email ?? null,
      nif: userAuth?.user?.nif ?? null,
      name: userAuth?.user?.name ?? null,
      surnames: userAuth?.user?.surnames ?? null,
      image: userAuth?.user?.image ?? null,
      permissions: userAuth?.user?.permissions ?? null,
    };
  },
  set: ({ set, get }, newUser) => {
    const dataAuthState = get(authState);
    set(authState, { ...dataAuthState, user: newUser });
    localStorage.setItem(
      "auth",
      JSON.stringify({ ...dataAuthState, user: newUser })
    );
  },
});
