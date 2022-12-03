import React from 'react';
import { Alert, Space } from 'antd';

import './error.css';

function Error(props) {
  const onClose = (e) => {
    // eslint-disable-next-line no-console
    console.log(e, 'I was closed.');
  };

  const { data } = props;
  const { errorName, errorMessage } = data;

  return (
    <div className="error">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert message={errorName} description={errorMessage} type={errorName} closable onClose={onClose} />
      </Space>
    </div>
  );
}

export default Error;
