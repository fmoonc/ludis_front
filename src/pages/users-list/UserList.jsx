import { LoadingIcon, Lucide, Modal, ModalBody } from "@/base-components";
import { Pagination, CounterPagination } from "@/components/pagination";
import { initialUser } from "@/constants/initial";
import useRoles from "@/hooks/useRoles";
import useUser from "@/hooks/useUser";
import ModalCreateUser from "@/pages/users-list/ModalCreateUser";
import ModalDeleteUser from "@/pages/users-list/ModalDeleteUser";
import ModalEditRol from "@/pages/users-list/ModalEditRol";
import ModalEditUser from "@/pages/users-list/ModalEditUser";
import UserCard from "@/pages/users-list/UserCard";
import { useState } from "react";

export default function UserList() {
  const actionsUser = useUser();
  const {} = useRoles();
  const [modalCreateUser, setModalCreateUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [modalEditRol, setModalEditRol] = useState(false);
  const [userSelected, setUserSelected] = useState(initialUser);

  const handleCreateUserModal = () => {
    setModalCreateUser(true);
  };

  const handleEditUserModal = ({ user }) => {
    setUserSelected(user);
    setModalEditUser(true);
  };

  const handleEditRolModal = ({ user }) => {
    setUserSelected(user);
    setModalEditRol(true);
  };

  const handleDeleteUserModal = ({ user }) => {
    setUserSelected(user);
    setModalDeleteUser(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Usuarios</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* LISTA DE ARRIBA */}
        <div className="intro-y col-span-12 flex flex-col items-start sm:flex-row justify-between mt-2">
          {/* AÑADIR USUARIO */}
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={handleCreateUserModal}
          >
            Añadir nuevo Usuario
          </button>
          {/* MENSAJE DE TOTALES */}
          <CounterPagination infoMeta={actionsUser.metaUser} name="usuarios" />
          {/* BUSCADOR */}
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Buscar..."
                onChange={(e) => {
                  actionsUser.setSearchName(e.target.value);
                  actionsUser.setPage(1);
                }}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* LAYOUT DE USUARIOS */}
        {actionsUser.loadingListUser ? (
          <LoadingIcon
            icon="oval"
            color="grey"
            className="w-10 h-10 col-span-12 mx-auto"
          />
        ) : (
          actionsUser.listUser &&
          actionsUser.listUser.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              handleEditUserModal={handleEditUserModal}
              handleDeleteUserModal={handleDeleteUserModal}
              handleEditRolModal={handleEditRolModal}
            />
          ))
        )}
        {Object.keys(actionsUser.metaUser).length > 0 && (
          <Pagination
            meta={actionsUser.metaUser}
            setPage={actionsUser.setPage}
            pagination={actionsUser.paginationUsers}
            perPage={actionsUser.setUsersPerPage}
          />
        )}
      </div>
      {/* MODAL CREATE */}
      <Modal
        size="modal-xl"
        show={modalCreateUser}
        onHidden={() => {
          setModalCreateUser(false);
        }}
      >
        <a
          onClick={() => {
            setModalCreateUser(false);
          }}
          className="absolute right-0 top-0 mt-4 mr-3 z-10"
          href="#"
        >
          <Lucide icon="X" className="w-8 h-8 text-slate-100" />
        </a>
        <ModalBody className="p-0">
          <ModalCreateUser
            createUser={actionsUser.createUser}
            loadingCreate={actionsUser.loadingCreate}
            closeModal={setModalCreateUser}
          />
        </ModalBody>
      </Modal>
      {/* MODAL EDIT */}
      {userSelected && (
        <Modal
          size="modal-xl"
          show={modalEditUser}
          onHidden={() => {
            setModalEditUser(false);
          }}
        >
          <a
            onClick={() => {
              setModalEditUser(false);
            }}
            className="absolute right-0 top-0 mt-4 mr-3 z-10"
            href="#"
          >
            <Lucide icon="X" className="w-8 h-8 text-slate-100" />
          </a>
          <ModalBody className="p-0">
            <ModalEditUser
              user={userSelected}
              editUserSelected={actionsUser.editUserSelected}
              loadingEdit={actionsUser.loadingEdit}
              closeModal={setModalEditUser}
            />
          </ModalBody>
        </Modal>
      )}
      {/* MODAL DELETE */}
      {userSelected && (
        <Modal
          size="modal-xl"
          show={modalDeleteUser}
          onHidden={() => {
            setModalDeleteUser(false);
          }}
        >
          <a
            onClick={() => {
              setModalDeleteUser(false);
            }}
            className="absolute right-0 top-0 mt-4 mr-3 z-10"
            href="#"
          >
            <Lucide icon="X" className="w-8 h-8 text-slate-100" />
          </a>
          <ModalBody className="p-0">
            <ModalDeleteUser
              user={userSelected}
              deleteUserSelected={actionsUser.deleteUserSelected}
              loadingDelete={actionsUser.loadingDelete}
              closeModal={setModalDeleteUser}
            />
          </ModalBody>
        </Modal>
      )}
      {/* MODAL EDIT ROL */}
      {userSelected && (
        <Modal
          size="modal-l"
          show={modalEditRol}
          onHidden={() => {
            setModalEditRol(false);
          }}
        >
          <a
            onClick={() => {
              setModalEditRol(false);
            }}
            className="absolute right-0 top-0 mt-4 mr-3 z-10"
            href="#"
          >
            <Lucide icon="X" className="w-8 h-8 text-slate-100" />
          </a>
          <ModalBody className="p-0">
            <ModalEditRol
              closeModal={setModalEditRol}
              user={userSelected}
              editRol={actionsUser.editRol}
              loadingRol={actionsUser.loadingRol}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
