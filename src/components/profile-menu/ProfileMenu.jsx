import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Lucide } from "@/base-components";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { helper } from "../../utils/helper";

export default function ProfileMenu() {
  const { userAuth } = useAuth();
  const { pathname } = useLocation();
  const path = useMemo(() => helper.deleteFirstLetter(pathname), []);

  return (
    <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
      <div className="intro-y box mt-5">
        <div className="relative flex items-center p-5">
          <div className="w-12 h-12 image-fit">
            <img
              alt="Avatar User"
              className="rounded-full"
              src={
                userAuth?.image ??
                `https://ui-avatars.com/api/?name=${userAuth?.name}`
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${userAuth?.name}`;
              }}
            />
          </div>
          <div className="ml-4 mr-auto">
            <div className="font-medium text-base">
              {userAuth?.name && userAuth?.surnames
                ? userAuth.name + " " + userAuth.surnames
                : "Name Unknown"}
            </div>
            <div className="text-slate-500">
              {userAuth?.role ? `Rol: ${userAuth.role}` : "Type Unknown"}
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
          <Link
            className={`flex items-center ${
              path === "perfil" && "text-primary font-medium"
            }`}
            to="/perfil"
          >
            <Lucide icon="User" className="w-4 h-4 mr-2" /> Perfil
          </Link>
          <Link
            className={`flex items-center mt-5 ${
              path === "cambiar-contrasena" && "text-primary font-medium"
            }`}
            to="/cambiar-contrasena"
          >
            <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Cambiar Contraseña
          </Link>
          <Link
            className={`flex items-center mt-5 ${
              path === "opciones" && "text-primary font-medium"
            }`}
            to="/opciones"
          >
            <Lucide icon="Sliders" className="w-4 h-4 mr-2" /> Opciones
          </Link>
        </div>
      </div>
    </div>
  );
}
