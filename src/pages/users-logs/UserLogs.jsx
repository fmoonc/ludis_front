import { Lucide, LoadingIcon } from "@/base-components";
import { useState, useEffect } from "react";
import { useLogs } from "@/hooks/useLogs";
/* import { useRangeDate } from "@/hooks/useRangeDate"; */
import TableLogs from "./TableLogs";
import { Pagination, CounterPagination } from "@/components/pagination";
/* import Filters from "./Filters"; */

function UserLogs() {
  const {
    logs,
    loading,
    meta,
    setPage,
    setLogsPerPage,
    paginationLogs,
    setSearchLog,
  } = useLogs();

  /* const [value, setValue] = useState(""); */
  const [dateRange, setDateRange] = useState("2022-01-01 - 2022-01-31");
  /*   const { changeFormat, fechaFin, fechaInicio } = useRangeDate(dateRange);
  const [isSearch, setIsSearch] = useState(false);
  const [causerSelected, setCauserSelected] = useState(""); */

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10 mb-10">Actividad</h2>
      {/* LISTA DE ARRIBA */}
      <div className="intro-y flex justify-between items-center mt-2 mb-4">
        {/* BUSCADOR */}
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div className="w-56 relative text-slate-500">
            <input
              type="text"
              className="form-control w-56 box pr-10"
              placeholder="Buscar..."
              onChange={(e) => {
                setSearchLog(e.target.value);
                setPage(1);
              }}
            />
            <Lucide
              icon="Search"
              className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
          </div>
        </div>
        {/* COUNTER */}
        <CounterPagination infoMeta={meta} name="actividades" />
      </div>

      <TableLogs logs={logs} loading={loading} />
      {meta?.links?.length > 0 && !loading && (
        <Pagination
          meta={meta}
          setPage={setPage}
          pagination={paginationLogs}
          perPage={setLogsPerPage}
        />
      )}
    </>
  );
}

export default UserLogs;
