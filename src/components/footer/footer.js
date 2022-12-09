import React from 'react';
import { Pagination } from 'antd';

import './footer.css';

function Footer(props) {
  const { totalPages, onChangePage, actPage } = props;
  return (
    <div className="footer">
      <Pagination current={actPage} total={totalPages * 10} onChange={(page) => onChangePage(page)} />
    </div>
  );
}

export default Footer;
