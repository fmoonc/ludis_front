import { Lucide } from "@/base-components";
import React from "react";

export function Pagination({ meta, setPage, pagination, perPage }) {
  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center ">
      <nav className="w-full sm:w-auto sm:mr-auto">
        <ul className="pagination overflow-x-auto">
          {/* INITIAL PAGE */}
          <li
            className={`page-item ${
              meta.current_page === 1 ? "opacity-25 cursor-not-allowed" : ""
            }`}
          >
            <button
              onClick={() => setPage(1)}
              className={`page-link ${
                meta.current_page === 1 ? "pointer-events-none" : null
              }`}
            >
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </button>
          </li>
          {/* BACK PAGE */}
          <li
            className={`page-item ${
              meta.links && meta.links[0].url === null
                ? "opacity-25 cursor-not-allowed"
                : ""
            }`}
          >
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              className={`page-link ${
                meta.links && meta.links[0].url === null
                  ? "pointer-events-none"
                  : ""
              }`}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </button>
          </li>
          {/* ACTUAL PAGE */}
          {meta.links.map((link, index) => {
            if (index === 0) return false;
            if (index === meta.links.length - 1) return false;
            return (
              <li
                className={`page-item w-fit min-w-fit ${
                  link.active || link.label == "..."
                    ? "opacity-25 cursor-not-allowed"
                    : ""
                }`}
                key={index}
              >
                <button
                  onClick={() => setPage(link.label)}
                  className={`page-link ${
                    link.active || link.label == "..."
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}

          {/* NEXT PAGE */}
          <li
            className={`page-item ${
              meta?.links && meta.links[meta.links.length - 1].url === null
                ? "opacity-25 cursor-not-allowed"
                : ""
            }`}
          >
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className={`page-link ${
                meta?.links && meta.links[meta.links.length - 1].url === null
                  ? "pointer-events-none"
                  : ""
              }`}
            >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </button>
          </li>
          {/* LAST PAGE */}
          <li
            className={`page-item ${
              meta.current_page === meta.last_page
                ? "opacity-25 cursor-not-allowed"
                : ""
            }`}
          >
            <button
              onClick={() => setPage(meta.last_page)}
              className={`page-link ${
                meta.current_page === meta.last_page
                  ? "pointer-events-none"
                  : ""
              }`}
            >
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </button>
          </li>
        </ul>
      </nav>

      <select
        className="w-20 form-select box mt-3 sm:mt-0"
        onChange={(e) => {
          perPage(e.target.value);
          setPage(1);
        }}
        value={meta.per_page}
      >
        {pagination &&
          pagination.map((page, index) => (
            <option key={index} value={page}>
              {page}
            </option>
          ))}
      </select>
    </div>
  );
}
