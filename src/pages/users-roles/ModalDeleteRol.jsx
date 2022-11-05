import { Lucide, LoadingIcon } from "@/base-components";
import React from "react";

export default function ModalDeleteRol({ rol, loading, deleteRol, onClose }) {
  return (
    <>
      <div className="p-5 text-center">
        <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
        <div className="text-3xl mt-5">¿Estas seguro?</div>
        <div className="text-slate-500 mt-2">
          {`Realmente quieres borrar el rol ${rol.name}?`} <br />
          Este proceso no puede deshacer.
        </div>
      </div>
      <div className="px-5 pb-8 text-center">
        <button
          type="button"
          onClick={() => {
            onClose(false);
          }}
          className="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            const res = deleteRol({ id: rol.id });
            res && onClose(false);
          }}
        >
          Borrar Rol
          {loading && (
            <LoadingIcon icon="oval" color="white" className="w-4 h-4 ml-2" />
          )}
        </button>
      </div>
    </>
  );
}
