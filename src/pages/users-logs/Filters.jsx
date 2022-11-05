import React, { useEffect, useState } from "react";
import { useLogs } from "@/hooks/useLogs";
import { Lucide, Litepicker } from "@/base-components";

const Filters = ({
  value,
  setValue,
  changeFormat,
  dateRange,
  isSearch,
  setIsSearch,
  setCauserSelected,
  handleResetFilters,
}) => {
  const { getLogs, arrayCauses } = useLogs();

  const handleSearch = (value) => {
    setIsSearch(!isSearch);
    getLogs(value);
  };

  return arrayCauses != null ? (
    arrayCauses.length > 0 && (
      <div className="flex w-full sm:w-auto w-100">
        <div className="w-48 relative text-slate-500">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            className="form-control w-48 box pr-10"
            placeholder="Buscar Acción de Log específico..."
          />
          <Lucide
            onClick={(e) => handleSearch(value)}
            icon="Search"
            className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 cursor:pointer"
          />
        </div>

        <div className="w-48 relative text-gray-700 ml-3">
          <Litepicker
            value={dateRange}
            onChange={(e) => changeFormat(e)}
            // onChange={(e) => alert()}
            options={{
              autoApply: false,
              singleMode: false,
              numberOfColumns: 2,
              numberOfMonths: 2,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
            className="form-control w-56 block mx-auto"
          />
        </div>

        <div className="w-48 ml-25 relative text-gray-700 ml-8">
          <select
            onChange={(e) => {
              setCauserSelected(e.target.value);
            }}
            className="form-select form-select-lg ml-2"
            aria-label=".form-select-lg example"
          >
            <option value="">Todos</option>
            {arrayCauses.map((item) => (
              <option key={item.causer_id} value={item.causer_id}>
                {item.email}
              </option>
            ))}
          </select>
        </div>
        <div className="w-48 ml-25 relative text-gray-700 ml-8">
          <button
            onClick={() => handleResetFilters()}
            className="btn btn-rounded btn-success-soft w-48 mr-1 mb-2"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    )
  ) : (
    <div>Cargando...</div>
  );
};

export default Filters;
