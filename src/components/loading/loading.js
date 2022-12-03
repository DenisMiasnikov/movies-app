import { Space, Spin } from 'antd';

import './loading.css';

function Loading() {
  return (
    <div className="loading">
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
}

export default Loading;
