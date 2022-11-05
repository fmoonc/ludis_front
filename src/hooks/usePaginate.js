import { useState } from "react";

export { usePaginate };

function usePaginate() {
  const [pagination, setPagination] = useState({});

  function paginate(pagination, pageActual) {
    let auxPagination = [];

    for (let i = 1; i <= pagination.last_page; i++) {
      auxPagination.push(i);
    }

    setPagination({
      previus_page: pageActual - 1,
      next_page: pageActual + 1,
      per_page: pagination.per_page,
      current_page: pagination.current_page,
      last_page: pagination.last_page,
      pagination: auxPagination,
    });
  }

  return {
    pagination,
    paginate,
  };
}
