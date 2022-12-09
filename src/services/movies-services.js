/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
export default class MoviesService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3';
    this._apiKey = '8fea04d24cb7d9ae76c4ac0dd489150e';
  }

  async getMovies(input, page) {
    const res = await fetch(
      `${this._apiBase}/search/movie?api_key=${this._apiKey}&language=en&query=${input}&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ${input} , recieved ${res.status}`);
    }

    return await res.json();
  }

  async getSession() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch, recieved ${res.status}`);
    }
    return await res.json();
  }

  async postRating(id, value, movie) {
    const data = {
      value: `${value}`,
    };

    const res = await fetch(`${this._apiBase}/movie/${movie}/rating?api_key=${this._apiKey}&guest_session_id=${id}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${id} , recieved ${res.status}`);
    }
    return await res.json();
  }

  async getRated(id, page) {
    const res = await fetch(
      `${this._apiBase}/guest_session/${id}/rated/movies?api_key=${this._apiKey}&language=en&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ${id} , recieved ${res.status}`);
    }

    return await res.json();
  }

  async getGenre() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en`);

    if (!res.ok) {
      throw new Error(`Could not fetch , recieved ${res.status}`);
    }

    return await res.json();
  }
}
