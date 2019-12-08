import React from 'react';

const Pagination = ({ postsPerPage, currentPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
          <li onClick={() => paginate(1)} className='pagination-item'><i className="fas fa-step-backward"></i></li>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}
           className={currentPage === number ? 'pagination-item pagination-item-current' : "pagination-item"}>  
            {number} 
          </li>
        ))}
            <li onClick={() => paginate(pageNumbers.length)} className='pagination-item'><i className="fas fa-step-forward"></i></li>
      </ul>
    </nav>
  );
};

export default Pagination;