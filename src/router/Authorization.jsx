import usePermissions from "@/hooks/usePermissions";
import SideMenu from "@/layouts/side-menu/Main";
/* import SimpleMenu from "@/layouts/simple-menu/Main";
import TopMenu from "@/layouts/top-menu/Main"; */
import { authState } from "@/stores/auth-store";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

//LAYOUTS
/* const SIDEMENU = "";
const SIMPLEMENU = "simple-menu";
const TOPMENU = "top-menu"; */

export default function Authorization() {
  const { hasPermission, hasPermissionInMenu } = usePermissions({
    load: false,
  });
  const auth = useRecoilValue(authState);
  const { pathname } = useLocation();
  /* const pathNameParts = pathname.split("/"); */

  if (!auth) {
    return <Navigate to="/login" />;
  }
  if (!hasPermission(pathname)) {
    return <Navigate to="/autorizacion" />;
  }

  /* if (
    pathNameParts[0] === SIDEMENU &&
    pathNameParts[1] !== SIMPLEMENU &&
    pathNameParts[1] !== TOPMENU
  ) */
  return <SideMenu hasPermissionInMenu={hasPermissionInMenu} />;
  /* if (pathNameParts[1] === SIMPLEMENU)
    return <SimpleMenu hasPermissionInMenu={hasPermissionInMenu} />;
  if (pathNameParts[1] === TOPMENU)
    return <TopMenu hasPermissionInMenu={hasPermissionInMenu} />; */
}
