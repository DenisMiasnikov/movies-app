import React from 'react';
import { Alert, Space } from 'antd';

import './error.css';

function Error(props) {
  const refreshPage = () => {
    window.location.reload();
  };

  const { data } = props;
  const { errorName, errorMessage } = data;

  return (
    <div className="error">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert message={`Ooops, ${errorName}`} description={errorMessage} type={errorName} />
        <button type="button" className="btn-error" onClick={refreshPage}>
          Please, try again
        </button>
      </Space>
    </div>
  );
}

export default Error;
