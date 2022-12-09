/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import MoviesService from '../../services/movies-services';
import MyContext from '../context/contex';
import './movieCard.css';
import Genre from '../genre';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.moviesService = new MoviesService();
    const { overview, id } = props;
    this.state = {
      text: overview,
      rate: 0,
      movie: id,
    };
    this.myRef = React.createRef();

    const rate = JSON.parse(localStorage.getItem(id));
    if (rate) {
      this.movieRate = Number(rate);
    }

    this.onChange = (e) => {
      if (e !== 0) {
        localStorage.setItem(id, JSON.stringify(`${e}`));
        this.setState({
          rate: e,
        });
      }
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { rate } = this.state;
    if (rate !== prevState.rate) {
      this.makeRate();
    }
  }

  makeRate() {
    const id = JSON.parse(localStorage.getItem('guestId'));
    const { rate, movie } = this.state;
    this.moviesService.postRating(id, rate, movie);
  }

  render() {
    const { title, release_date, vote_average, poster_path, genre_ids } = this.props;
    const poster = poster_path
      ? `https://image.tmdb.org/t/p/w200${poster_path}`
      : 'https://as1.ftcdn.net/v2/jpg/05/04/28/96/1000_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg';
    const { text } = this.state;
    const hiddenText = text.length > 200 ? `${text.slice(0, text.indexOf(' ', 100))}...` : text;
    const rating = vote_average.toFixed(1);
    const release = release_date ? new Date(release_date) : null;
    const formattedDate = release ? format(release, 'PP') : '';
    if (rating <= 3) {
      this.className = 'card-rank';
    }
    if (rating > 3 && rating <= 5) {
      this.className = 'card-rank lowRating';
    }
    if (rating > 5 && rating <= 7) {
      this.className = 'card-rank normalRating';
    }
    if (rating > 7) {
      this.className = 'card-rank highRating';
    }
    return (
      <MyContext.Consumer>
        {(genre) => (
          <div className="card">
            <img className="card-image" src={poster} alt="" />
            <div className="card-info">
              <h2 className="card-title">{title}</h2>
              <span className="card-date">{formattedDate}</span>
              <Genre
                value={genre_ids.map((item1) => {
                  const res = genre.filter((item2) => {
                    if (item2.id === item1) {
                      return item2;
                    }
                  });
                  const [genres] = res;
                  return genres;
                })}
              />
              <p ref={this.myRef} className="card-text">
                {hiddenText}
              </p>
              <Rate
                className="card-stars"
                count="10"
                allowHalf
                defaultValue={this.movieRate}
                size="small"
                onChange={this.onChange}
              />
              <span className={this.className}>{rating}</span>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
