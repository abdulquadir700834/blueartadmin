import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
    paginate(number);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-end">
        {currentPage > 1 && (
          <li className="page-item">
            <a onClick={handlePrevious} className="page-link">
              &laquo;
            </a>
          </li>
        )}
        {pageNumbers
          .filter(
            (number) =>
              number === currentPage ||
              number === currentPage - 1 ||
              number === currentPage + 1
          )
          .map((number) => (
            <li key={number} className="page-item">
              <a onClick={() => handleClick(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        {currentPage < pageNumbers.length && (
          <li className="page-item">
            <a onClick={handleNext} className="page-link">
              &raquo;
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
