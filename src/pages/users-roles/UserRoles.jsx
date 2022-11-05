import React from "react";
import ListRoles from "@/pages/users-roles/ListRoles";
import CreateRol from "@/pages/users-roles/CreateRol";
import usePermissions from "@/hooks/usePermissions";
import useRoles from "@/hooks/useRoles";
import { Lucide, Modal, ModalBody, LoadingIcon } from "@/base-components";
import ModalDeleteRol from "@/pages/users-roles/ModalDeleteRol";

export default function UserRoles() {
  const {
    loadingRoles,
    handleDeleteRol,
    modalDelete,
    listRoles,
    setModalDelete,
    rolSelected,
    deleteRol,
    loadingDeleteRol,
    createRol,
    loadingCreateRol,
  } = useRoles();

  const { permissions, loadingPermissions } = usePermissions({ load: true });

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Roles</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
          {/* CREATE ROL */}
          {!loadingPermissions ? (
            <CreateRol
              permissions={permissions}
              createRol={createRol}
              loadingCreateRol={loadingCreateRol}
            />
          ) : (
            <LoadingIcon
              icon="oval"
              color="grey"
              className="w-10 h-10 block mx-auto"
            />
          )}
        </div>
        {/* LIST ROLES */}
        <div className="col-span-12 lg:col-span-6 2xl:col-span-6">
          <ListRoles
            loading={loadingRoles}
            roles={listRoles}
            handleDeleteRol={handleDeleteRol}
          />
        </div>
      </div>
      {/* MODAL DELETE */}

      <Modal
        size="modal-xl"
        show={modalDelete}
        onHidden={() => {
          setModalDelete(false);
        }}
      >
        <a
          onClick={() => {
            setModalDelete(false);
          }}
          className="absolute right-0 top-0 mt-4 mr-3 z-10"
          href="#"
        >
          <Lucide icon="X" className="w-8 h-8 text-slate-100" />
        </a>
        <ModalBody className="p-0">
          <ModalDeleteRol
            rol={rolSelected}
            deleteRol={deleteRol}
            loading={loadingDeleteRol}
            onClose={setModalDelete}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
