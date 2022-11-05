import React from "react";
import {
  AccordionGroup,
  AccordionItem,
  Accordion,
  AccordionPanel,
  LoadingIcon,
  TomSelect,
  Lucide,
} from "@/base-components";
import { helper } from "@/utils/helper";

export default function ListRoles({ loading, roles, handleDeleteRol }) {
  return (
    <div className="intro-y box">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Lista de Roles</h2>
      </div>

      <div className="p-5">
        <AccordionGroup className="accordion-boxed">
          {loading ? (
            <LoadingIcon icon="oval" className="mx-auto w-10 h-10 block" />
          ) : (
            roles &&
            roles.map(({ id, name, permissions }) => {
              return (
                <AccordionItem key={id}>
                  <div className="flex justify-between items-center">
                    <div className="btn btn-sm btn-secondary ">
                      <Accordion>
                        <div className="flex items-center text-xs">
                          Rol: {helper.capitalizeFirstLetter(name)}
                          <Lucide icon="ChevronDown" className="w-3 h-3 ml-2" />
                        </div>
                      </Accordion>
                    </div>

                    <div>
                      <button className="btn btn-sm btn-secondary mr-2">
                        <Lucide icon="Edit2" className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleDeleteRol({ id })}
                      >
                        <Lucide icon="Trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <AccordionPanel className="text-slate-600 dark:text-slate-500 leading-relaxed">
                    <TomSelect
                      disabled
                      value={permissions.map((permission) => permission.id)}
                      options={{
                        placeholder: "Permisos del Rol",
                      }}
                      className="w-full"
                      multiple
                    >
                      {permissions &&
                        permissions.map(({ id, description }) => (
                          <option key={id} value={id}>
                            {description}
                          </option>
                        ))}
                    </TomSelect>
                  </AccordionPanel>
                </AccordionItem>
              );
            })
          )}
        </AccordionGroup>
      </div>
    </div>
  );
}

{
}
