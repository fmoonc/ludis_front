import { Alert, LabelError, Lucide, LoadingIcon } from "@/base-components";
import useAuth from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validationChangePassword } from "@/constants/validations";


export default function ModalContentForgotPassword() {
  const { userAuth, resetPassword, loading } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationChangePassword),
  });
  const { errors } = formState;

  const onSubmit = ({ email }) => resetPassword({ email });

return(
<>
<div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Change Password */}
          <div className="intro-y box lg:mt-5">
            {/* <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                Cambiar Contraseña
              </h2>
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-5">
                <Alert className="alert-secondary flex items-center mb-2">
                  {({ dismiss }) => (
                    <>
                      <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> Se
                      te enviará un email para poder cambiar la contraseña
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={dismiss}
                      >
                        <Lucide icon="X" className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </Alert>

                <div>
                  <label
                    htmlFor="change-password-form-1"
                    className="form-label"
                  >
                    Correo Electronico
                  </label>
                  <div className="input-group">
                    <div id="input-group-email" className="input-group-text">
                      @
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="input-group-email"
                      className={`form-control ${
                        errors.email &&
                        "border-2 border-danger/70 dark:border-danger/50"
                      } py-3 px-4 block`}
                      {...register("email")}
                      defaultValue={userAuth?.email ?? null}
                    />
                  </div>
                </div>
                {/* ERRORS EMAILS */}
                <LabelError errors={errors.email} />
                <button type="submit" className="btn btn-primary mt-4">
                  Enviar Email
                  {loading && (
                    <LoadingIcon
                      icon="oval"
                      color="white"
                      className="w-4 h-4 ml-2"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* END: Change Password */}
        </div>
</>
)
}