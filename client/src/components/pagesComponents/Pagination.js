import React from 'react';

const Pagination = ({ postsPerPage, currentPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        <a onClick={() => paginate(1)} href="#main-cont"><li className='pagination-item'>
          <i className="fas fa-step-backward"></i></li>
        </a>
        {pageNumbers.map(number => (
          <a key={number}  onClick={() => paginate(number)} href="#main-cont">
            <li className={currentPage === number ? 'pagination-item pagination-item-current' : "pagination-item"}>  
              {number} 
            </li>
          </a>
        ))}
        <a onClick={() => paginate(pageNumbers.length)} href="#main-cont">
          <li className='pagination-item'><i className="fas fa-step-forward"></i></li>
        </a>
      </ul>
    </nav>
  );
};

export default Pagination;