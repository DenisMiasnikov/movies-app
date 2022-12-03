import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import MoviesService from '../../services/movies-services';
import './app.css';
import Header from '../header';
import MoviesList from '../moviesList';
import Footer from '../footer';
import Loading from '../loading';
import Error from '../error';

export default class App extends Component {
  moviesService = new MoviesService();

  state = {
    movieData: [],
    loading: true,
    error: false,
    errorBody: {},
  };

  constructor() {
    super();
    this.updateMovie();
    // this.moviesService = new MoviesService();
    // this.state = {
    //   movieData: [],
    // };
  }

  onMoviesLoaded = (movieData) => {
    const newData = movieData.results;
    this.setState({
      movieData: newData,
      loading: false,
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
    this.moviesService.getMovies('return').then(this.onMoviesLoaded).catch(this.onError);
  }

  // updateMovie() {
  //   this.moviesService.getMovies('return').then((movies) => {
  //     this.setState(({ movieData }) => {
  //       const newData = [...movieData, ...movies.results];

  //       return {
  //         movieData: newData,
  //       };
  //     });
  //   });
  // }

  render() {
    const { movieData, loading, error, errorBody } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Loading /> : null;
    const content = hasData ? <MoviesApp moviesData={movieData} /> : null;
    const errorMessage = error ? <Error data={errorBody} /> : null;

    return (
      <div className="moviesapp">
        <Offline>
          <Error data={{ errorName: 'Offline', errorMessage: 'You are Offline, please check your connection' }} />
        </Offline>
        <Online>
          {errorMessage}
          {spinner}
          {content}
        </Online>
      </div>
    );
  }
}

function MoviesApp(props) {
  const { moviesData } = props;
  return (
    <>
      <Header />
      <MoviesList data={moviesData} />
      <Footer />
    </>
  );
}
