export default class ApiDate {
  apiBaseCearch = 'https://api.themoviedb.org/3/search/movie?api_key=';

  apiBase = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=';

  maiKey = '01411d29f2d66cd14a095c99303873a5';

  async sessionСreation() {
    const response = await fetch(`${this.apiBase}${this.maiKey}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Could not fetch function sessionСreation
      ,received ${response.status}`);
    }
    return result;
  }

  async searchMovies(str, page) {
    const response = await fetch(`${this.apiBaseCearch}${this.maiKey}&query=${str}&page=${page}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${str} 
      ,received ${response.status}`);
    }
    const result = await response.json();

    return result;
  }

  async rateMovie(idMovie, idSession, starsRate) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/rating?api_key=${this.maiKey}&guest_session_id=${idSession}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: `${starsRate}` }),
      }
    );
    if (!response.ok) {
      throw new Error(`Could not fetch function rateMovie
      ,received ${response.status}`);
    }
    const result = await response.json();

    return result;
  }

  async getRateMovie(idSes, pege) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${idSes}/rated/movies?api_key=${this.maiKey}&page=${pege}&language=en-US&sort_by=created_at.desc`
    );
    if (!response.ok) {
      throw new Error(`Could not fetch function getRateMovie
      ,received ${response.status}`);
    }
    const result = await response.json();

    return result;
  }
}
// https://api.themoviedb.org/3/search/movie?api_key=01411d29f2d66cd14a095c99303873a5&query=return
// https://api.themoviedb.org/3/authentication/guest_session/new?api_key=
