import { useState, useEffect } from "react";
import useFetch from "./useFecth";
import useDebounce from "@/hooks/useDebounce";
import { paginationLogs } from "@/constants/paginations";

export { useLogs };

function useLogs() {
  const PATH_URL = import.meta.env.VITE_BASE_URL;
  const logsFetch = useFetch(PATH_URL);
  /* const { pagination, paginate } = usePaginate(); */
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(paginationLogs[0]);
  const [searchLog, setSearchLog] = useState("");
  const debouncedSearchLog = useDebounce(searchLog, 300);

  useEffect(() => {
    getLogs({
      search: debouncedSearchLog,
      perPage: logsPerPage,
      page: page,
    });
    /* getCauses(); */
  }, [searchLog, page, logsPerPage]);

  /* function getCauses() {
    setArrayCauses(null);
    return logsFetch.get("logs/causes").then((data) => {
      data.status === "error" ? "error" : data;
      setArrayCauses(data.data);
    });
  } */

  function getLogs({
    search = "",
    page,
    perPage,
    fechaInicio = "",
    fechaFin = "",
    causer = "",
  }) {
    setLoading(true);
    return logsFetch
      .get(
        `logs?search=${search}&page=${page}&perPage=${perPage}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&causer=${causer}`
      )
      .then((data) => {
        setLoading(false);
        setLogs(data);
      });
  }

  return {
    getLogs,
    /* getCauses, */
    /* paginate,
    pagination, */
    logs: logs?.data ?? [],
    meta: logs?.meta ?? [],
    setPage,
    page,
    loading,
    logsPerPage,
    setLogsPerPage,
    paginationLogs,
    setSearchLog,
  };
}
