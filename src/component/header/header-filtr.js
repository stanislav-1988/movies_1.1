import { Tabs } from 'antd';
import React from 'react';

import './header-filtr.css';

function HeaderFilter({ filterMovie }) {
  return (
    <div className="header-filter">
      <Tabs
        centered
        defaultActiveKey="1"
        onChange={filterMovie}
        items={[
          {
            label: 'Search',
            key: true,
          },
          {
            label: 'Rated',
            key: false,
          },
        ]}
      />
    </div>
  );
}

export default HeaderFilter;
