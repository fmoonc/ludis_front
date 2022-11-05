import { validationEditUser } from "@//constants/validations";
import {
  LabelError,
  LoadingIcon,
  Lucide,
  Tippy,
  TomSelect,
} from "@/base-components";
import useAuth from "@/hooks/useAuth";
import useAvatar from "@/hooks/useAvatar";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export default function ViewEditUser() {
  const { editUserAuth, loadingEdit, userAuth } = useAuth();
  const {
    avatarRef,
    handleChangeAvatar,
    handleCleanAvatar,
    setBase64,
    getBase64Image,
    base64,
  } = useAvatar();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(validationEditUser),
    defaultValues: useMemo(() => userAuth, [userAuth]),
  });
  const { errors } = formState;

  useEffect(() => {
    getBase64Image(userAuth.image, function (base64image) {
      setBase64(base64image);
      document.getElementById("avatar").value = "";
    });
  }, [userAuth]);

  const onSubmit = ({ name, nif, surnames, id }) => {
    editUserAuth({ name, nif, surnames, avatar: base64, id });
  };

  return (
    <div className="intro-y box lg:mt-5">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Información Personal</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div className="flex xl:flex-row flex-col-reverse">
            <div className="flex-1 mt-6 xl:mt-0">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-12 2xl:col-span-6">
                  {/* email */}
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-profile-form-1"
                      className="form-label"
                    >
                      Email
                    </label>

                    <input
                      id="update-profile-form-1"
                      type="text"
                      className="form-control"
                      defaultValue={userAuth?.email ?? null}
                      disabled
                    />
                    <LabelError />
                  </div>
                  {/* nif */}
                  <div className="mt-3">
                    <label
                      htmlFor="update-user-form-4"
                      className="form-label"
                    >
                      NIF
                    </label>
                    <input
                      id="update-user-form-4"
                      type="text"
                      className={`form-control ${
                        errors.nif && "border-danger dark:border-danger"
                      }`}
                      placeholder="Numero de Identificación Nacional"
                      {...register("nif")}
                      defaultValue={userAuth?.nif ?? null}
                    />
                    <LabelError errors={errors.nif} />
                  </div>
                </div>
                <div className="col-span-12 2xl:col-span-6">
                  {/* Nombre */}
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-name-user-5"
                      className="form-label"
                    >
                      Nombre
                    </label>
                    <input
                      id="update-name-user-5"
                      type="text"
                      className={`form-control ${
                        errors.name && "border-danger dark:border-danger"
                      }`}
                      placeholder="Nombre del administrador"
                      {...register("name")}
                      defaultValue={userAuth?.name ?? null}
                    />
                    <LabelError errors={errors.name} />
                  </div>
                  {/* Apellidos */}
                  <div className="mt-3">
                    <label
                      htmlFor="update-surnames-user-6"
                      className="form-label"
                    >
                      Apellidos
                    </label>
                    <input
                      id="update-surnames-user-6"
                      type="text"
                      {...register("surnames")}
                      className={`form-control ${
                        errors.surnames && "border-danger dark:border-danger"
                      }`}
                      placeholder="Apellidos del administrador"
                      defaultValue={userAuth?.surnames ?? null}
                    />
                    <LabelError errors={errors.surnames} />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="mt-3">
                    <label
                      htmlFor="update-profile-form-7"
                      className="form-label"
                    >
                      Permisos de Usuario
                    </label>
                    <TomSelect
                      disabled
                      value={Array.from(
                        { length: userAuth?.permissions?.length },
                        (_, i) => i
                      )}
                      options={{
                        placeholder: "Select your favorite actors",
                      }}
                      className="w-full"
                      multiple
                    >
                      {userAuth?.permissions &&
                        userAuth?.permissions.map((permission, index) => (
                          <option key={permission} value={index}>
                            {permission}
                          </option>
                        ))}
                    </TomSelect>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-auto mt-3">
                Guardar
                {loadingEdit && (
                  <LoadingIcon
                    icon="oval"
                    color="white"
                    className="w-4 h-4 ml-2"
                  />
                )}
              </button>
            </div>
            <div className="w-52 mx-auto xl:mr-0 xl:ml-6">
              <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                  <img
                    className="rounded-md"
                    alt={`Avatar de ${userAuth?.name ?? "unknown"}`}
                    src={
                      base64 ??
                      `https://ui-avatars.com/api/?name=${userAuth?.name}`
                    }
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
