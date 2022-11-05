import { LabelError, LoadingIcon, TomSelect } from "@/base-components";
import { initialRol } from "@/constants/initial";
import { validationCreateRol } from "@/constants/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateRol({
  permissions,
  createRol,
  loadingCreateRol,
}) {
  const [selectPermission, setSelectPermission] = useState(
    Array.from({ length: permissions?.length }, (_, i) => i + 1)
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationCreateRol),
    defaultValues: useMemo(() => initialRol, [initialRol]),
  });

  const onSubmit = async ({ name }) => {
    const status = await createRol({ name, permissions: selectPermission });
    status && reset(initialRol);
  };

  return (
    <div className="intro-y box">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Crear Rol</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div>
            <label htmlFor="create-name-rol" className="form-label">
              Nombre
            </label>
            <input
              id="create-name-rol"
              type="text"
              {...register("name")}
              className={`form-control ${
                errors.name && "border-danger dark:border-danger"
              }`}
              placeholder="Nombre del Rol"
            />
            <LabelError errors={errors.name} />
          </div>
          <div className="mt-4">
            <label htmlFor="add-permissions-rol" className="form-label">
              Permisos
            </label>

            <TomSelect
              value={selectPermission}
              onChange={setSelectPermission}
              options={{
                placeholder: "Selecciona tus permisos",
                plugins: {
                  dropdown_header: {
                    title: "Permisos",
                  },
                },
              }}
              className="w-full"
              multiple
            >
              {permissions.length > 0 &&
                permissions.map(({ id, description }) => (
                  <option key={id} value={id} className="text-center">
                    {description}
                  </option>
                ))}
            </TomSelect>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Crear Rol
            {loadingCreateRol && (
              <LoadingIcon icon="oval" color="white" className="w-4 h-4 ml-2" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
