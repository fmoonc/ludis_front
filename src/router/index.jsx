import React from "react";
import { useRoutes } from "react-router-dom";
// AUTORIZATION
import Authorization from "../router/Authorization";
// NO AUTORIZATION
import Login from "@/pages/login/Login";
import ErrorPage from "@/pages/error-page/ErrorPage";
import DashBoard from "@/pages/dashboard/DashBoard";
import Permissions from "@/pages/permissions/Permissions";
// PAGES
const ChangePassword = React.lazy(() =>
  import("@/pages/change-password/ChangePassword")
);
const UpdateProfile = React.lazy(() =>
  import("@/pages/update-profile/UpdateProfile")
);
const UserLogs = React.lazy(() => import("@/pages/users-logs/UserLogs"));
const UserList = React.lazy(() => import("@/pages/users-list/UserList"));
const UserRoles = React.lazy(() => import("@/pages/users-roles/UserRoles"));
const Configure = React.lazy(() => import("@/pages/configure/Configure"));

export const routes = [
  {
    path: "/",
    element: <Authorization />,
    children: [
      /* ICONS INSIDE PATHS / */
      {
        path: "/",
        icon: "Home",
        element: <DashBoard />,
      },
      {
        path: "usuarios",
        icon: "Users",
        element: <UserList />,
      },
      {
        path: "roles",
        icon: "Unlock",
        element: <UserRoles />,
      },
      {
        path: "actividad",
        icon: "Info",
        element: <UserLogs />,
      },
      {
        path: "cambiar-contrasena",
        icon: "Lock",
        element: <ChangePassword />,
      },
      {
        path: "perfil",
        icon: "User",
        element: <UpdateProfile />,
      },
      {
        path: "opciones",
        icon: "Sliders",
        element: <Configure />,
      },
    ],
  },
  /* {
    path: "/simple-menu",
    element: <Authorization />,
    children: [
      {
        path: "dashboard",
        element: <h1>DASHBOARD</h1>,
      },
      {
        path: "usuarios",
        element: <UserList />,
      },
      {
        path: "roles",
        element: <UserRoles />,
      },
      {
        path: "actividad",
        element: <UserLogs />,
      },
      {
        path: "cambiar-contrasena",
        element: <ChangePassword />,
      },
      {
        path: "perfil",
        element: <UpdateProfile />,
      },
      {
        path: "opciones",
        element: <Configure />,
      },
    ],
  },
  {
    path: "/top-menu",
    element: <Authorization />,
    children: [
      {
        path: "dashboard",
        element: <h1>DASHBOARD</h1>,
      },
      {
        path: "usuarios",
        element: <UserList />,
      },
      {
        path: "roles",
        element: <UserRoles />,
      },
      {
        path: "actividad",
        element: <UserLogs />,
      },
      {
        path: "cambiar-contrasena",
        element: <ChangePassword />,
      },
      {
        path: "perfil",
        element: <UpdateProfile />,
      },
      {
        path: "opciones",
        element: <Configure />,
      },
    ],
  }, */
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/error-page",
    element: <ErrorPage />,
  },
  {
    path: "/autorizacion",
    element: <Permissions />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default function Router() {
  return useRoutes(routes);
}
