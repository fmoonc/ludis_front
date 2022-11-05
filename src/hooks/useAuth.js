import useNotification from "@/hooks/useNotification";
import { authState, updateAuthUser } from "@/stores/auth-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import useFetch from "./useFecth";

export default function useAuth() {
  const PATH_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const loginFecth = useFetch(PATH_URL);
  const editUserFecth = useFetch(PATH_URL);
  const resetPasswordFecth = useFetch(PATH_URL);
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { showNotification } = useNotification();
  const setGlobalUser = useSetRecoilState(updateAuthUser);

  function login({ email, password }) {
    setLoading(true);
    return loginFecth.post("login", { email, password }).then((data) => {
      data.status === "error" ? setAuth(null) : setAuth(data.data);
      data.status === "error"
        ? localStorage.setItem("auth", JSON.stringify(null))
        : localStorage.setItem("auth", JSON.stringify(data.data));
      setLoading(false);
      return data;
    });
  }

  function logout() {
    localStorage.setItem("auth", JSON.stringify(null));
    setAuth(null);
    navigate("login");
  }

  function resetPassword({ email }) {
    setLoading(true);
    return resetPasswordFecth
      .post("forgot-password", { email })
      .then(({ status, data }) => {
        status === "success"
          ? showNotification({
              type: "success",
              msg: "Se le ha enviado un correo!",
            })
          : showNotification({
              type: "error",
              msg: "Error al enviar el correo",
            });

        setLoading(false);
        return data;
      });
  }

  function editUserAuth({ name, nif, surnames, avatar, id }) {
    setLoadingEdit(true);
    return editUserFecth
      .put(`users/${id}`, { name, nif, surnames, image: avatar })
      .then(({ status, data }) => {
        if (status === "error") {
          showNotification({ type: "error", msg: data });
          return false;
        } else {
          showNotification({ type: "success", msg: "Perfil Modificado!" });
          setLoadingEdit(false);
          setGlobalUser(data);
          return true;
        }
      });
  }

  return {
    login,
    logout,
    resetPassword,
    setAuth,
    editUserAuth,
    loadingEdit,
    auth,
    loading,
    userAuth: auth?.user,
  };
}
