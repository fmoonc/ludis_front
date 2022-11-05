import useNotification from "@/hooks/useNotification";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function DashBoard() {
  const { showNotification } = useNotification();
  const [params, setParams] = useSearchParams();
  const loginSuccess = params.get("toast") ?? "";
  const notPermission = params.get("permission") ?? "";

  useEffect(() => {
    if (loginSuccess === "success") {
      showNotification({ type: loginSuccess, msg: "Logueado con exito!" });
      params.delete("toast");
      setParams(params);
    }
    if (notPermission === "success") {
      showNotification({ type: notPermission, msg: "No tienes permisos" });
      params.delete("permission");
      setParams(params);
    }
  }, []);
  
  return <h1>DASHBOARD</h1>;
}
