import { useState, useEffect } from "react";
import useFetch from "./useFecth";
import useNotification from "@/hooks/useNotification";
import { useSetRecoilState } from "recoil";
import {
  updateRolesSelector,
  rolesAtom,
  addRolSelector,
  deleteRolSelector,
} from "@/stores/roles-store";
import { useRecoilValue } from "recoil";
import { initialRol } from "@/constants/initial";

export default function useRoles() {
  const PATH_URL = import.meta.env.VITE_BASE_URL;
  const rolesFecth = useFetch(PATH_URL);
  const deleteRolFecth = useFetch(PATH_URL);
  const createRolFecth = useFetch(PATH_URL);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingDeleteRol, setLoadingDeleteRol] = useState(false);
  const [loadingCreateRol, setLoadingCreateRol] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [rolSelected, setRolSelected] = useState(initialRol);
  const { showNotification } = useNotification();
  const setUpdateRolesAtom = useSetRecoilState(updateRolesSelector);
  const setAddRolesAtom = useSetRecoilState(addRolSelector);
  const setDeleteRolesAtom = useSetRecoilState(deleteRolSelector);
  const listRoles = useRecoilValue(rolesAtom);

  useEffect(() => {
    getRoles();
  }, []);

  const handleDeleteRol = async ({ id }) => {
    setModalDelete(true);
    setRolSelected(listRoles.find((rol) => rol.id === id));
  };

  function getRoles() {
    setLoadingRoles(true);
    return rolesFecth.get("roles").then(({ data, status }) => {
      setLoadingRoles(false);
      status === "success"
        ? setUpdateRolesAtom(data)
        : showNotification({ type: status, msg: data });
      return data;
    });
  }

  function deleteRol({ id }) {
    setLoadingDeleteRol(true);
    return deleteRolFecth.delete(`roles/${id}`).then(({ data, status }) => {
      setLoadingDeleteRol(false);
      showNotification({ type: status, msg: data });
      if (status === "success") {
        setDeleteRolesAtom(id);
        return true;
      }
      return false;
    });
  }

  function createRol({ name, permissions }) {
    setLoadingCreateRol(true);
    return createRolFecth
      .post("roles", { name, permissions })
      .then(({ status, data }) => {
        setLoadingCreateRol(false);
        if (status === "success") {
          setAddRolesAtom(data);
          showNotification({ type: status, msg: "Rol creado!" });
          return true;
        } else {
          showNotification({ type: status, msg: data });
          return false;
        }
      });
  }

  return {
    listRoles, // listado de roles
    loadingRoles, // loader de cargar listado de roles
    handleDeleteRol, // manejador para borrar rol
    setModalDelete, // manejador para accionar modal de borrar rol
    modalDelete, // estado del modal borrar rol
    loadingDeleteRol, // loader para borrar rol
    deleteRol, // servicio para borrar al rol
    rolSelected, // Rol seleccionado (al borrar, al editar)
    loadingCreateRol, // loader para crear un rol
    createRol, // funcion para crear un rol
  };
}
