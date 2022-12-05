import React from 'react';
import { Pagination } from 'antd';

import './footer.css';
// export default class Footer extends Component {
//   render() {
//     return <div className="footer" />;
//   }
// }
function Footer(props) {
  const { totalPages, onChangePage, actPage } = props;
  // const myFn = (page) => {
  //   onChangePage(page);
  // };
  // const myPager = document.querySelector('.ant-pagination-item-1');
  // console.log(myPager);
  return (
    <div className="footer">
      <Pagination current={actPage} total={totalPages * 10} onChange={(page) => onChangePage(page)} />
    </div>
  );
}

export default Footer;
