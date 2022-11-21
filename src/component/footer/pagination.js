import { Pagination } from 'antd';
import React from 'react';

import './pagination.css';

function PaginationMovies({ paginationList, pegeNum }) {
  return (
    <div className="pagination">
      <Pagination current={pegeNum} onChange={paginationList} size="small" total={50} />
    </div>
  );
}

export default PaginationMovies;
