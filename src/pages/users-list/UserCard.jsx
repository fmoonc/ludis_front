import React from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";

export default function UserCard({
  user,
  handleEditUserModal,
  handleDeleteUserModal,
  handleEditRolModal,
}) {
  return (
    <div className="intro-y col-span-12 md:col-span-6 lg:col-span-4">
      <div className="box">
        <div className="flex items-start px-5 pt-5">
          <div className="w-full flex flex-col lg:flex-row items-center">
            <div className="w-16 h-16 image-fit">
              <img
                className="rounded-md"
                alt={`Avatar de ${user?.name ?? "unknown"}`}
                src={
                  user?.image ??
                  `https://ui-avatars.com/api/?name=${user?.name}`
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${user?.name}`;
                }}
              />
            </div>
            <div className="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
              <a href="" className="font-medium">
                {`${user.name} ${user.surnames}`}
              </a>
              <div className="text-slate-500 text-xs mt-0.5">
                Rol: {user.role}
              </div>
            </div>
          </div>
          <Dropdown className="absolute right-0 top-0 mr-5 mt-3">
            <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
              <Lucide
                icon="MoreHorizontal"
                className="w-5 h-5 text-slate-500"
              />
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <div
                    className="flex w-full p-0"
                    onClick={() => handleEditUserModal({ user })}
                  >
                    <Lucide icon="Edit2" className="w-4 h-4 mr-2" /> Editar
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div
                    className="flex w-full p-0"
                    onClick={() => handleDeleteUserModal({ user })}
                  >
                    <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Borrar
                  </div>
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="text-center lg:text-left p-5">
          <div className="flex items-center justify-center lg:justify-start text-slate-500 mt-5">
            <Lucide icon="Mail" className="w-3 h-3 mr-2" />
            {user.email}
          </div>
          <div className="flex items-center justify-center lg:justify-start text-slate-500 mt-1">
            <Lucide icon="CreditCard" className="w-3 h-3 mr-2" />
            {user.nif}
          </div>
        </div>
        <div className="text-center lg:text-right p-5 border-t border-slate-200/60 dark:border-darkmode-400">
          <button
            className="btn btn-primary py-1 px-2 mr-2"
            onClick={() => handleEditRolModal({ user })}
          >
            Cambiar Rol
          </button>

          {/* <button className="btn btn-outline-secondary py-1 px-2">
            Cambiar Rol
          </button> */}
        </div>
      </div>
    </div>
  );
}
