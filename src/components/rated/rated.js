import React, { Component } from 'react';

import MoviesService from '../../services/movies-services';
import Footer from '../footer';
import MoviesList from '../moviesList';
import Empty from '../empty';
import Loading from '../loading';
import Error from '../error';

export default class Rated extends Component {
  constructor(props) {
    super(props);
    const { rated } = this.props;

    this.moviesService = new MoviesService();

    this.state = {
      ratedMovie: rated,
      movieData: [],
      totalPages: 0,
      actPage: 1,
      loading: true,
      error: false,
      errorBody: {},
    };
  }

  componentDidMount() {
    this.updateRated();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { actPage, ratedMovie } = this.state;
    if (actPage !== prevState.actPage || ratedMovie !== prevState.ratedMovie) {
      this.updateRated();
      window.scrollTo(0, 0);
    }
  }

  onMoviesLoaded = (movieData) => {
    const newData = movieData.results;
    const pages = movieData.total_pages;
    this.setState({
      movieData: newData,
      loading: false,
      totalPages: pages,
    });
  };

  onError = (err) => {
    this.setState({
      errorBody: {
        errorName: err.name,
        errorMessage: err.message,
      },
      error: true,
      loading: false,
    });
  };

  onChangePage = (page) => {
    const newPage = page;
    this.setState({
      loading: true,
      actPage: newPage,
    });
  };

  updateRated() {
    const id = JSON.parse(localStorage.getItem('guestId'));
    const { actPage } = this.state;
    this.moviesService.getRated(id, actPage).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movieData, totalPages, actPage, loading, error, errorBody } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Loading /> : null;
    const errorMessage = error ? <Error data={errorBody} /> : null;
    const emptyData =
      movieData.length < 1 ? (
        <Empty />
      ) : (
        <>
          <MoviesList data={movieData} />
          <Footer totalPages={totalPages} actPage={actPage} onChangePage={this.onChangePage} />
        </>
      );
    const data = hasData ? emptyData : null;
    return (
      <>
        {errorMessage}
        {spinner}
        {data}
      </>
    );
  }
}
