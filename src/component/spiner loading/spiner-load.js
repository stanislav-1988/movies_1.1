import { Alert, Spin } from 'antd';
import React from 'react';

import './spiner-load.css';

function SpinerLoading() {
  return (
    <div className="spiner-load">
      <Spin tip="Loading...">
        <Alert
          message="Loading search result"
          description="not long to wait. very soon we will show you the result of the search."
          type="info"
        />
      </Spin>
    </div>
  );
}

export default SpinerLoading;
