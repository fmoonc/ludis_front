import { useState } from "react";
import moment from "moment";
export { useRangeDate };

function useRangeDate() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  function changeFormat(dateRange) {
    let date = dateRange.split(" - ");

    let fechaInicio = moment(new Date(date[0]).toISOString().split("T")[0])
      .add(1, "d")
      .format("YYYY-MM-DD");

    let fechaFin = moment(new Date(date[1]).toISOString().split("T")[0])
      .add(1, "d")
      .format("YYYY-MM-DD");

    setFechaInicio(fechaInicio);
    setFechaFin(fechaFin);
  }

  return {
    fechaInicio,
    fechaFin,
    changeFormat,
  };
}
