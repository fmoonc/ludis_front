import React from "react";

export function CounterPagination({ infoMeta, name = "unidades" }) {
  return (
    <div className="hidden md:block text-slate-500">
      {infoMeta
        ? `página ${infoMeta.current_page ?? "0"} de ${
            infoMeta.last_page ?? "0"
          } de ${infoMeta.total ?? "0"} ${name ?? "name"}`
        : `Mostramos ...`}
    </div>
  );
}
