import React, { Component } from 'react';
import { debounce } from 'lodash';

import Footer from '../footer';
import MoviesList from '../moviesList';
import Empty from '../empty';
import MoviesService from '../../services/movies-services';
import Loading from '../loading';
import Header from '../header';
import Error from '../error';

export default class Search extends Component {
  moviesService = new MoviesService();

  state = {
    movieData: [],
    loading: true,
    error: false,
    errorBody: {},
    totalPages: 0,
    actPage: 1,
    query: 'return',
    inputValue: '',
  };

  debounceTest = debounce((val) => {
    this.setState({
      loading: false,
      query: val,
      actPage: 1,
      inputValue: '',
    });
  }, 1000);

  componentDidMount() {
    this.updateMovie();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { actPage, query } = this.state;
    if (actPage !== prevState.actPage) {
      this.updateMovie();
      window.scrollTo(0, 0);
    } else if (query !== prevState.query) {
      this.updateMovie();
    }
  }

  onChangePage = (page) => {
    const newPage = page;
    this.setState({
      actPage: newPage,
      loading: true,
      inputValue: '',
    });
  };

  onQueryChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      loading: true,
      inputValue: value,
    });

    if (value !== '') {
      this.debounceTest(value);
    }
  };

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

  updateMovie() {
    const { actPage, query } = this.state;
    this.moviesService.getMovies(query, actPage).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    const { movieData, totalPages, actPage, loading, error, errorBody, inputValue } = this.state;
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
        <Header onQueryChange={this.onQueryChange} inputValue={inputValue} />
        {errorMessage}
        {spinner}
        {data}
      </>
    );
  }
}
