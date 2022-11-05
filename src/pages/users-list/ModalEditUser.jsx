import {
  LabelError,
  LoadingIcon,
  Lucide,
  Tippy,
  TomSelect
} from "@/base-components";
import useAvatar from "@/hooks/useAvatar";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { validationEditUser } from "@/constants/validations";

export default function ModalEditUser({
  user,
  loadingEdit,
  editUserSelected,
  closeModal,
}) {
  
  const {
    avatarRef,
    handleChangeAvatar,
    handleCleanAvatar,
    base64,
    setBase64,
    getBase64Image,
  } = useAvatar();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationEditUser),
    defaultValues: useMemo(() => user, [user]),
  });

  useEffect(() => {
    getBase64Image(user.image, function (base64image) {
      setBase64(base64image);
      document.getElementById("avatar").value = "";
    });
  }, [user]);
  useEffect(() => reset(user), [user]);

  const onSubmit = async ({ name, nif, surnames, id }) => {
    const status = await editUserSelected({ name, nif, surnames, avatar: base64 , id });
    status && closeModal(false);  
  };

  return (
    <div className=" lg:mt-5">
      <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">Editar Usuario</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div className="flex xl:flex-row flex-col-reverse">
            <div className="flex-1 mt-6 xl:mt-0">
              <div className="grid grid-cols-12 gap-x-5">
                <div className="col-span-12 2xl:col-span-6">
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-user-form-3"
                      className="form-label"
                    >
                      Email
                    </label>

                    <input
                      id="update-user-form-3"
                      type="text"
                      className="form-control"
                      {...register("email")}
                      disabled
                    />
                    <LabelError />
                  </div>

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
                        errors.name && "border-danger dark:border-danger"
                      }`}
                      placeholder="Documento de identidad"
                      {...register("nif")}
                    />
                    <LabelError errors={errors.nif} />
                  </div>
                </div>
                <div className="col-span-12 2xl:col-span-6">
                  <div className="mt-3 2xl:mt-0">
                    <label
                      htmlFor="update-name-user-6"
                      className="form-label"
                    >
                      Nombre
                    </label>
                    <input
                      id="update-name-user-6"
                      type="text"
                      className={`form-control ${
                        errors.name && "border-danger dark:border-danger"
                      }`}
                      placeholder="Nombre del administrador"
                      {...register("name")}
                    />
                    <LabelError errors={errors.name} />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="update-surnames-user-2"
                      className="form-label"
                    >
                      Apellidos
                    </label>
                    <input
                      id="update-surnames-user-2"
                      type="text"
                      {...register("surnames")}
                      className={`form-control ${
                        errors.surnames && "border-danger dark:border-danger"
                      }`}
                      placeholder="Apellidos del administrador"
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
                        { length: user?.permissions?.length },
                        (_, i) => i
                      )}
                      options={{
                        placeholder: "Select your favorite actors",
                      }}
                      className="w-full"
                      multiple
                    >
                      {user?.permissions &&
                        user?.permissions.map((permission, index) => (
                          <option key={permission} value={index}>
                            {permission}
                          </option>
                        ))}
                    </TomSelect>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-auto mt-3">
                Editar
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
                    alt={`Avatar de ${user?.name ?? "unknown"}`}
                    src={
                      base64 ?? `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${user?.name}`;
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
