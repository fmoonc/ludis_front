import { authPermissionState } from "@/stores/auth-store";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import useFetch from "./useFecth";
import useNotification from "@/hooks/useNotification";

const routesPermissionsInMenu = {
  Usuarios: "panel.users.index",
  Roles: "panel.roles.index",
  Permisos: "panel.users.index",
  Actividad: "panel.users.index",
  "Side Menu": "panel.side.menu",
  "Simple Menu": "panel.simple.menu",
  "Top Menu": "panel.top.menu",
};

const routesPermissions = {
  "/": "panel.dashboard.index",
  "/opciones": "panel.dashboard.index",
  "/perfil": "panel.dashboard.index",
  "/error-page": "panel.dashboard.index",
  "/cambiar-contrasena": "panel.dashboard.index",
  "/usuarios": "panel.users.index",
  "/roles": "panel.roles.index",
  "/permisos": "panel.permissions.index",
  "/actividad": "panel.logs.index",
};

export default function usePermissions({load = false}) {
  const PATH_URL = import.meta.env.VITE_BASE_URL;
  const { showNotification } = useNotification();
  const permissionsGlobal = useRecoilValue(authPermissionState);
  const permissionsFecth = useFetch(PATH_URL);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    load && getPermissions();
  }, []);

  function hasPermissionInMenu(route) {
    if (route) {
      return permissionsGlobal.includes(routesPermissionsInMenu[route]) ?? null;
    }
    return null;
  }

  function hasPermission(route) {
    if (route) {
      return permissionsGlobal.includes(routesPermissions[route]) ?? null;
    }
    return null;
  }

  function getPermissions() {
    setLoadingPermissions(true);
    return permissionsFecth.get("permissions").then(({ data, status }) => {
      setLoadingPermissions(false);
      status === "success"
        ? setPermissions(data)
        : showNotification({ type: status, msg: data });
      return true;
    });
  }

  return {
    hasPermissionInMenu,
    hasPermission,
    getPermissions,
    loadingPermissions,
    permissions,
  };
}
