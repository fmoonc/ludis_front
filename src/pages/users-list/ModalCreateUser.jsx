import { LabelError, LoadingIcon, Lucide, Tippy } from "@/base-components";
import useAvatar from "@/hooks/useAvatar";
import { rolesAtom } from "@/stores/roles-store";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { validationCreateUser } from "@/constants/validations";
import { initialUser } from "@/constants/initial";

export default function ModalCreateUser({
  createUser,
  loadingCreate,
  closeModal,
}) {
  const roles = useRecoilValue(rolesAtom);
  const { avatarRef, handleChangeAvatar, handleCleanAvatar, base64 } =
    useAvatar();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationCreateUser),
    defaultValues: useMemo(() => initialUser, [initialUser]),
  });

  const onSubmit = async (data) => {
    const status = await createUser({ data, base64 });
    if (status) {
      reset(initialUser);
      closeModal(false);
      handleCleanAvatar();
    }
  };

  return (
    <div className=" lg:mt-5">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Crear Usuario</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div className="flex xl:flex-row flex-col-reverse">
            <div className="flex-1 mt-6 xl:mt-0">
              <div className="grid grid-cols-12 gap-x-5">
                {/* EMAIL Y PASSWORD */}
                <div className="col-span-12 2xl:col-span-6">
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-profile-form-2"
                      className="form-label"
                    >
                      Email
                    </label>

                    <input
                      id="update-profile-form-2"
                      type="text"
                      className={`form-control ${
                        errors.email && "border-danger dark:border-danger"
                      }`}
                      {...register("email")}
                      placeholder="Email"
                    />
                    <LabelError errors={errors.email} />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="create-user-form-4"
                      className="form-label"
                    >
                      Contraseña
                    </label>
                    <input
                      id="create-user-form-4"
                      type="password"
                      className={`form-control ${
                        errors.password && "border-danger dark:border-danger"
                      }`}
                      {...register("password")}
                      placeholder="Contraseña"
                    />
                    <LabelError errors={errors.password} />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="update-profile-form-8"
                      className="form-label"
                    >
                      Rol
                    </label>
                    <select
                      className={`form-select mr-0 ${
                        errors.rol && "border-danger dark:border-danger"
                      }`}
                      aria-label="Default select example"
                      {...register("role")}
                    >
                      <option value="" defaultValue disabled hidden>
                        Elige Rol
                      </option>
                      {roles &&
                        roles.map((rol) => (
                          <option key={rol.id}>{rol.name}</option>
                        ))}
                    </select>
                    <LabelError errors={errors.role} />
                  </div>
                </div>
                {/* NOMBRE Y APELLIDOS */}
                <div className="col-span-12 2xl:col-span-6">
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="create-name-user"
                      className="form-label"
                    >
                      Nombre
                    </label>
                    <input
                      id="create-name-user"
                      type="text"
                      className={`form-control ${
                        errors.name && "border-danger dark:border-danger"
                      }`}
                      placeholder="Nombre"
                      {...register("name")}
                    />
                    <LabelError errors={errors.name} />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="create-surnames-user"
                      className="form-label"
                    >
                      Apellidos
                    </label>
                    <input
                      id="create-surnames-user"
                      type="text"
                      {...register("surnames")}
                      className={`form-control ${
                        errors.surnames && "border-danger dark:border-danger"
                      }`}
                      placeholder="Apellidos"
                    />
                    <LabelError errors={errors.surnames} />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="update-profile-form-7"
                      className="form-label"
                    >
                      NIF
                    </label>
                    <input
                      id="update-profile-form-7"
                      type="text"
                      className={`form-control ${
                        errors.nif && "border-danger dark:border-danger"
                      }`}
                      placeholder="Documento de identificación"
                      {...register("nif")}
                    />
                    <LabelError errors={errors.nif} />
                  </div>
                </div>
                {/* NIF Y ROLES */}
                <div className="col-span-12 2xl:col-span-6"></div>
              </div>
              {/* BOTON CREAR */}
              <button type="submit" className="btn btn-primary w-auto mt-3">
                Crear Usuario
                {loadingCreate && (
                  <LoadingIcon
                    icon="oval"
                    color="white"
                    className="w-4 h-4 ml-2"
                  />
                )}
              </button>
            </div>
            {/* AVATAR */}
            <div className="w-52 mx-auto xl:mr-0 xl:ml-6">
              <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                  <img
                    className="rounded-md"
                    alt={`Avatar Nuevo Usuario}`}
                    src={base64 ?? `https://ui-avatars.com/api/?name=NewUser`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=NewUser`;
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleCleanAvatar}
                    className="z-10 w-5 h-5 flex items-center justify-center rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                  >
                    <Tippy
                      tag="div"
                      content="¿Borrar esta foto?"
                      className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                    >
                      <Lucide icon="X" className="w-4 h-4" />
                    </Tippy>
                  </button>
                </div>
                <div className="mx-auto cursor-pointer relative mt-5">
                  <button type="button" className="btn btn-primary w-full">
                    Cambiar Avatar
                  </button>
                  <input
                    id="avatar"
                    type="file"
                    className="w-full h-full top-0 left-0 absolute opacity-0"
                    ref={avatarRef}
                    onChange={handleChangeAvatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
