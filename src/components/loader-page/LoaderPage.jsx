import React from "react";
import { LoadingIcon } from "@/base-components";

export default function LoaderPage({ text = "Cargando..." }) {
  return (
    <div className="w-full h-full overflow-hidden opacity-75 flex flex-col items-center justify-center">
      <LoadingIcon icon="three-dots" className="w-4 h-4 block min-w-fit" />
    </div>
  );
}
