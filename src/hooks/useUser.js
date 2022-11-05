import { paginationUsers } from "@/constants/paginations";
import useDebounce from "@/hooks/useDebounce";
import { authState } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useFetch from "./useFecth";
import useNotification from "./useNotification";

export default function useUser() {
  const PATH_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const editUserFecth = useFetch(PATH_URL);
  const createUserFecth = useFetch(PATH_URL);
  const deleteUserFecth = useFetch(PATH_URL);
  const listUserFecth = useFetch(PATH_URL);
  const editRolFecth = useFetch(PATH_URL);
  const globalUser = useRecoilValue(authState);
  const { showNotification } = useNotification();
  const [listUser, setlistUser] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingListUser, setloadingListUser] = useState(false);
  const [loadingRol, setLoadingRol] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(paginationUsers[0]);
  const debouncedSearchName = useDebounce(searchName, 300);

  useEffect(() => {
    getlistUser({
      name: debouncedSearchName,
      perPage: usersPerPage,
      page: page,
    });
  }, [debouncedSearchName, usersPerPage, page]);

  function editRol({ role, id }) {
    setLoadingRol(true);
    return editRolFecth
      .put(`users/rol/${id}`, { role })
      .then(({ data, status }) => {
        if (status === "error") {
          showNotification({ type: "error", msg: data });
          setLoadingRol(false);
          return false;
        } else {
          showNotification({ type: "success", msg: "Rol Modificado!" });
          setLoadingRol(false);
          addUserSelected({ newUser: data });
          return true;
        }
      });
  }

  function editUserSelected({ name, nif, surnames, avatar, id }) {
    setLoadingEdit(true);
    return editUserFecth
      .put(`users/${id}`, { name, nif, surnames, image: avatar })
      .then(({ status, data }) => {
        if (status === "error") {
          showNotification({ type: "error", msg: data });
          setLoadingEdit(false);
          return false;
        } else {
          showNotification({ type: "success", msg: "Perfil Modificado!" });
          setLoadingEdit(false);
          addUserSelected({ newUser: data });
          return true;
        }
      });
  }

  function createUser({ data, base64 }) {
    const { email, name, nif, password, role, surnames } = data;
    setLoadingCreate(true);
    return createUserFecth
      .post(`users`, {
        email,
        name,
        nif,
        password,
        role,
        surnames,
        type_user: "admin",
        image: base64,
      })
      .then(({ status, data }) => {
        if (status === "error") {
          showNotification({ type: "error", msg: data });
          setLoadingCreate(false);
          return false;
        } else {
          showNotification({ type: "success", msg: "Usuario Creado!" });
          setTimeout(() => {
            showNotification({
              type: "success",
              msg: "Correo para activar cuenta!",
            });
          }, 1500);
          setLoadingCreate(false);
          getlistUser({
            name: "",
            perPage: paginationUsers[0],
            page: 1,
          });
          return true;
        }
      });
  }

  function deleteUserSelected({ id }) {
    setLoadingDelete(true);
    return deleteUserFecth.delete(`users/${id}`).then(({ status, data }) => {
      if (status === "error") {
        setLoadingDelete(false);
        showNotification({ type: "error", msg: data });
        return false;
      } else {
        showNotification({ type: "success", msg: "Usuario Elimiado!" });
        setLoadingDelete(false);
        getlistUser({
          name: "",
          perPage: paginationUsers[0],
          page: 1,
        });
        return true;
      }
    });
  }

  function addUserSelected({ newUser }) {
    const index = listUser.data.findIndex((user) => user.id === newUser.id);
    listUser.data[index] = newUser;
    setlistUser(listUser);
  }

  function getlistUser({ name, perPage, page }) {
    setloadingListUser(true);
    return listUserFecth
      .get(`users?name=${name ?? ""}&perPage=${perPage}&page=${page}`)
      .then(({ data, meta, status }) => {
        if (status === "error") {
          setloadingListUser(false);
          showNotification({ type: "error", msg: data });
          return navigate("/?permission=success");
        } else {
          setloadingListUser(false);
          setlistUser({ data, meta });
          return true;
        }
      });
  }

  return {
    editUserSelected,
    deleteUserSelected,
    createUser,
    editRol,
    setSearchName,
    searchName,
    listUser: listUser?.data ?? [],
    metaUser: listUser?.meta ?? {},
    loadingEdit,
    loadingDelete,
    loadingListUser,
    loadingCreate,
    loadingRol,
    user: globalUser.user,
    setPage,
    paginationUsers,
    setUsersPerPage,
  };
}
