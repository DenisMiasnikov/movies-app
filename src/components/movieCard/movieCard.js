/* eslint-disable camelcase */
import React, { Component } from 'react';
import { format } from 'date-fns';
import LinesEllipsis from 'react-lines-ellipsis';
import { Rate } from 'antd';

import './movieCard.css';

function MovieCard(props) {
  const { title, release_date, overview, vote_count, vote_average, poster_path } = props;
  const release = release_date ? new Date(release_date) : null;
  // const date = new Date(release_date);
  // const formattedDate = format(date, 'PP');
  const formattedDate = release ? format(release, 'PP') : '';
  return (
    <div className="card">
      <img className="card-image" src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <span className="card-date">{formattedDate}</span>
        <span className="carg-genre">Genre</span>
        {/* <p className="card-text">{overview}</p> */}
        <LinesEllipsis
          className="card-text"
          text={overview}
          maxLine="3"
          ellipsis=" ..."
          trimRight
          basedOn="words"
          component="p"
        />
        {/* <span className="card-stars">{vote_count}</span> */}
        <Rate className="card-stars" count="10" allowHalf defaultValue={vote_average} size="small" />
        <span className="card-rank">{vote_average}</span>
      </div>
    </div>
  );
}

export default MovieCard;
