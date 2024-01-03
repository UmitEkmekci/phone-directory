import React, { useState, useEffect } from 'react';
import PaginationCss from '../styles/Pagination.css';

const Pagination = ({ sortedUIList, setCurrentUIList }) => {

  // currentPage: Kullanıcının şu anda bulunduğu sayfa numarası.
  const [currentPage, setCurrentPage] = useState(1);

  // pageNumbers: Sayfa numaralarının bir listesi.
  const [pageNumbers, setPageNumbers] = useState([]);

  // itemsPerPage: Her sayfada gösterilecek öğe sayısı.
  const itemsPerPage = 4;

  // lengthOfTotalArray: sortedUIList'in toplam uzunluğu.
  const lengthOfTotalArray = sortedUIList.length;

  // totalPages: Toplam sayfa sayısını hesaplar.
  const totalPages = Math.ceil(lengthOfTotalArray / itemsPerPage);

  // Sayfa numaralarını hesaplayan ve ayarlayan useEffect.
  useEffect(() => {
    const newPageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      newPageNumbers.push(i);
    }
    setPageNumbers(newPageNumbers);
  }, [lengthOfTotalArray, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Geçerli sayfa değiştiğinde, o sayfada gösterilecek öğeleri ayarlar.
  useEffect(() => {
    setCurrentUIList(sortedUIList.slice(indexOfFirstItem, indexOfLastItem));
  }, [indexOfLastItem, indexOfLastItem, sortedUIList]);

  // Render edilen sayfa numaraları ve sayfa değişikliği için onClick handler'lar.
  return (
    <div>
      <nav>
        <ul className="pagination">
          {(currentPage >= 2) && <button onClick={() => setCurrentPage(currentPage - 1)}> Back </button>}
          {pageNumbers.map(number => (
            <li key={number} className={number === currentPage ? 'page-number active' : 'page-number'}>
              <a onClick={(e) => {
                e.preventDefault();
                setCurrentPage(number);
              }} href="!#">
                {number}
              </a>
            </li>
          ))}
          {( currentPage < pageNumbers.length) && <button onClick={() => setCurrentPage(currentPage + 1)}> Forward </button>}
        </ul>
      </nav>
    </div>
  )
};

export default Pagination;