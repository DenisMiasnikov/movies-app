import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';

import MoviesService from '../../services/movies-services';
import './app.css';
import Header from '../header';
import MoviesList from '../moviesList';
import Footer from '../footer';
import Loading from '../loading';
import Error from '../error';
import Empty from '../empty';

export default class App extends Component {
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
      // inputValue: '',
    });
  }, 1000);

  componentDidMount() {
    this.updateMovie();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { actPage, query } = this.state;
    if (actPage !== prevState.actPage) {
      this.updateMovie();
    } else if (query !== prevState.query) {
      this.updateMovie();
    }
  }

  onChangePage = (page) => {
    const newPage = page;
    this.setState({
      actPage: newPage,
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
    const { movieData, loading, error, errorBody, totalPages, actPage, inputValue } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Loading /> : null;
    const content = hasData ? (
      <MoviesApp moviesData={movieData} pages={totalPages} actPage={actPage} onChange={this.onChangePage} />
    ) : null;
    const errorMessage = error ? <Error data={errorBody} /> : null;

    return (
      <div className="moviesapp">
        <Offline>
          <Error data={{ errorName: 'Offline', errorMessage: 'You are Offline, please check your connection' }} />
        </Offline>
        <Online>
          <Header onQueryChange={this.onQueryChange} inputValue={inputValue} />
          {errorMessage}
          {spinner}
          {content}
        </Online>
      </div>
    );
  }
}

function MoviesApp(props) {
  const { moviesData, pages, onChange, actPage } = props;
  const emptyData = moviesData.length < 1 ? <Empty /> : <MoviesList data={moviesData} />;
  return (
    <>
      {emptyData}
      <Footer totalPages={pages} actPage={actPage} onChangePage={onChange} />
    </>
  );
}
