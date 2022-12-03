/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class MoviesService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3';
    this._apiKey = '8fea04d24cb7d9ae76c4ac0dd489150e';
  }

  async getMovies(input) {
    const res = await fetch(`${this._apiBase}/search/movie?api_key=${this._apiKey}&language=en&query=${input}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${input} , recieved ${res.status}`);
    }

    return await res.json();
  }

  async getMovieById(id) {
    const res = await fetch(`${this._apiBase}/movie/${id}?api_key=${this._apiKey}&language=en&query=return`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${id} , recieved ${res.status}`);
    }

    return await res.json();
  }
}

const movie = new MoviesService();
movie.getMovies('return').then((data) => {
  // eslint-disable-next-line
  console.log(data);
});

// movie.getMovieById('24021').then((movie) => {
//   // eslint-disable-next-line
//   console.log(movie);
// });

// fetch('https://image.tmdb.org/t/p/w500/66RvLrRJTm4J8l3uHXWF09AICol.jpg').
//   then((res) => {
//     console.log(res)
//   })

// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher search movie
