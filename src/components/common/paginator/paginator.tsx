import React, {useState} from 'react';
import styles from './paginator.module.css';

type Props = {
  currentPage?: number;
  onPageChange?: (pageNumber: number) => void;
  totalItemsCount: number;
  pageSize: number;
  portionSize?: number;
}

const Paginator: React.FC<Props> = ({currentPage = 1, onPageChange = () => {}, totalItemsCount, pageSize, portionSize = 10}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount/portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pageButtons}>
      {portionNumber > 1 &&
      <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
        return <span
          className={currentPage === p ? styles.selectedPage : undefined}
          key={p}
          onClick={() => onPageChange(p)}
        >{p} </span>
      })}
      {portionCount > portionNumber  &&
      <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
    </div>
  )
}

export default Paginator;