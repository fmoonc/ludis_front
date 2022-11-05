import { LabelError, LoadingIcon } from "@/base-components";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { rolesAtom } from "@/stores/roles-store";
import { validationUpdatedRol } from "@/constants/validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ModalEditRol({ user, editRol, loadingRol, closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationUpdatedRol),
    defaultValues: useMemo(() => user, [user]),
  });

  const roles = useRecoilValue(rolesAtom);

  useEffect(() => reset(user), [user]);

  const onSubmit = async ({role, id}) => {
    const status = await editRol({ role, id });
    status && closeModal(false);
  };

  return (
    <div className=" lg:mt-5">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Editar Rol de Usuario</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div className="flex xl:flex-row flex-col-reverse">
            <div className="flex-1 xl:mt-0">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-12">
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-rol-form-3"
                      className="form-label"
                    >
                      Email
                    </label>

                    <input
                      id="update-rol-form-3"
                      type="text"
                      className="form-control"
                      {...register("email")}
                      disabled
                    />
                    <LabelError />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="update-profile-form-3"
                      className="form-label"
                    >
                      Nuevo Rol
                    </label>

                    <select
                      className={`form-select mr-0 ${
                        errors.rol && "border-danger dark:border-danger"
                      }`}
                      aria-label="Default select example"
                      {...register("role")}
                    >
                      {roles &&
                        roles.map((rol) => (
                          <option key={rol.id}>{rol.name}</option>
                        ))}
                    </select>
                    <LabelError />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-auto mt-3">
                Editar Rol
                {loadingRol && (
                  <LoadingIcon
                    icon="oval"
                    color="white"
                    className="w-4 h-4 ml-2"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
