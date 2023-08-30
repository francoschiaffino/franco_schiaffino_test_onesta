import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxDisplayedPages = 3;
  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(startPage + maxDisplayedPages - 1, pageNumbers.length);
  }
  if (endPage > pageNumbers.length) {
    endPage = pageNumbers.length;
    startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-link"
      >
        {"<"}
      </button>
      {pageNumbers.slice(startPage - 1, endPage).map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`page-link ${currentPage === number ? 'selected selected-blue' : ''}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="page-link"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

