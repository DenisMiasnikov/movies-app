/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';

import './genre.css';

function Genre(props) {
  const { value } = props;
  const elements = value.map((item) => {
    if (item !== undefined) {
      return (
        <span className="card-genre_info" key={item.id}>
          {item.name}
        </span>
      );
    }
  });

  return <div className="card-genre">{elements}</div>;
}

export default Genre;
