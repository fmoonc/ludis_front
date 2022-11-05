import { atom, selector } from "recoil";

export const rolesAtom = atom({
  key: "rolesAtom",
  default: [],
});

export const updateRolesSelector = selector({
  key: "updateRolesSelector",
  get: ({ get }) => {
    return get(rolesAtom);
  },
  set: ({ set }, newRoles) => {
    set(rolesAtom, newRoles);
  },
});

export const addRolSelector = selector({
  key: "addRolSelector",
  get: ({ get }) => {
    return get(rolesAtom);
  },
  set: ({ set, get }, newRol) => {
    const roles = get(rolesAtom);
    set(rolesAtom, [...roles, newRol]);
  },
});

export const deleteRolSelector = selector({
  key: "deleteRolSelector",
  get: ({ get }) => {
    return get(rolesAtom);
  },
  set: ({ set, get }, id) => {
    const roles = get(rolesAtom);
    const newRoles = roles.filter((rol) => rol.id !== id);
    set(rolesAtom, newRoles);
  },
});
