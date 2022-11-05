import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validationLogin } from "@/constants/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelError, LoadingIcon } from "@/base-components";
import { useSearchParams } from "react-router-dom";

import LoginImg from "@/assets/images/luviit/login.png";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../../base-components/modal";
import ModalContentForgotPassword from "../forgot-password/modal-content-forgot-password";

export default function Login() {
  const [openModal, setOpenModal]  = useState(false);
  const { showNotification } = useNotification();
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(validationLogin),
  });
  const { errors } = formState;
  const [params, setParams] = useSearchParams();
  const tokenExpired = params.get("tokenExpired") ?? "";

  
  

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");

    if (tokenExpired === "success") {
      showNotification({ type: "error", msg: "Acceso caducado" });
      params.delete("tokenExpired");
      setParams(params);
    }
  }, []);

  const onSubmit = ({ email, password }) => {
    login({ email, password }).then((data) => {
      data.status === "success"
        ? navigate("/?toast=success") // params by show notification in other page
        : showNotification({ type: "error", msg: data.data });
    });
  };

  return (
    <>

      <div>
      
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <span className="text-white text-lg ml-3">
                  {" "}
                  Panel de control base{" "}
                </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-50 -mt-16"
                  // src="https://www.aicor.com/wp-content/uploads/2018/09/logo_blanco.png"
                  src={LoginImg}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  LUVIIT <br />
                  Transformación digital.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  DashBoard de prueba para clientes.
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="xl:h-auto flex w-full"
            >
              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0 w-full">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Bienvenido a Luviit
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl ">
                    Inicia sesión con tu cuenta. Maneja y controla todo tu
                    negocio a través del dashboard.
                  </div>

                  {/* CAMPO EMAIL */}
                  <div className="intro-x mt-8">
                    <input
                      id="email"
                      type="text"
                      className={`intro-x login__input form-control ${
                        errors.email && "border-danger dark:border-danger"
                      } py-3 px-4 block`}
                      placeholder="Email"
                      {...register("email")}
                    />
                    <LabelError errors={errors.email} />

                    {/* CAMPO PASSWORD */}
                    <input
                      type="password"
                      className={`intro-x login__input form-control ${
                        errors.password && "border-danger dark:border-danger"
                      } py-3 px-4 block mt-4`}
                      placeholder="Contraseña"
                      {...register("password")}
                    />
                  </div>
                  <LabelError errors={errors.password} />

                  <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="form-check-input border mr-2"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Recuerdamelo
                      </label>
                    </div>
                    <a
                    style={{cursor: "pointer"}}
                    onClick={() => setOpenModal(true)}
                    >Olvidastes la contraseña?</a>
                  </div>
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-fit xl:mr-3 align-top"
                      disabled={loading}
                    >
                      Iniciar Sesión
                      {loading && (
                        <LoadingIcon
                          icon="oval"
                          color="white"
                          className="w-4 h-4 ml-2"
                        />
                      )}
                    </button>
                  </div>

                  <div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                    Antes de iniciar sesión, debes de leer nuestros
                    <a
                      className="text-primary font-black dark:text-slate-200"
                      href=""
                    >
                      {" Términos y Condiciones "}
                    </a>
                    &
                    <a
                      className="text-primary font-black dark:text-slate-200"
                      href=""
                    >
                      {" Políticas de Privacidad"}.
                    </a>
                  </div>
                </div>
              </div>
            </form>
            {/* END: Login Form */}
          </div>
        </div>
        {/* MODAL CAMBIO CONTRASEÑA INICIO*/}
      <Modal
        show={openModal}
        >
        <ModalHeader>
          <h5 className="modal-title">Reestablecer contraseña</h5>
        </ModalHeader>
        <ModalBody>
          <ModalContentForgotPassword/>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" data-dismiss="modal"
          onClick={() => setOpenModal(false)}
          >
          Cerrar
          </button>
        </ModalFooter>
      </Modal>
      {/* MODAL CAMBIO CONTRASEÑA FIN*/}
      </div>
    </>
  );
}
