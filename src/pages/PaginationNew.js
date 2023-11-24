import React from 'react';

const PaginationNew = ({ postsPerPage, totalPosts, totalPages, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      paginate(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  // Calculate the range of page numbers to display
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(startPage + 2, totalPages);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  return (
    <nav>
      <ul className="pagination justify-content-end">
        {currentPage > 1 && (
          <li className="page-item">
            <button onClick={handlePrevious} className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="visually-hidden">Previous</span>
            </button>
          </li>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number} className={`page-item${currentPage === number ? ' active' : ''}`}>
            <button onClick={() => handlePageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="page-item">
            <button onClick={handleNext} className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="visually-hidden">Next</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PaginationNew;
