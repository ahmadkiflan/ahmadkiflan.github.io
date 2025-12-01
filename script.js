const searchButton = async () => {
  const inputSearch = document.getElementById("input-search");
  const value = inputSearch.value;
  inputSearch.value = "";
  const movies = await getMovies(value);
  uImovies(movies);
};

const getMovies = (inputKeyword) =>
  fetch(`http://www.omdbapi.com/?apikey=db87e2cb&s=${inputKeyword}`)
    .then((response) => response.json())
    .then((response) => response.Search);

const uImovies = (movies) => {
  let cards = "";
  for (const movie of movies) {
    cards += showMovie(movie);
  }
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = cards;
};

document.addEventListener("click", async (e) => {
  const imdbid = e.target.dataset.imdbid;
  const movieDetail = await getMovieDetail(imdbid);
  uImovieDetail(movieDetail);
});

const uImovieDetail = (movie) => {
  const modalContainer = document.querySelector(".modal");
  modalContainer.style.display = "flex";
  modalContainer.innerHTML = showMovieDetail(movie);
  modalContainer.addEventListener("click", (e) => {
    if (e.target.className == "modal" || e.target.id == "close-button") {
      modalContainer.style.display = "none";
    }
  });
};

const getMovieDetail = (imdbid) =>
  fetch(`http://www.omdbapi.com/?apikey=db87e2cb&i=${imdbid}`)
    .then((response) => response.json())
    .then((response) => response);

const showMovie = (movie) =>
  `<section class="card">
    <figure>
      <img src="${movie.Poster}" />
    </figure>
    <button class="movie-detail-button" data-imdbid="${movie.imdbID}">
      Movie Detail
    </button>
  </section>`;

const showMovieDetail = (movie) =>
  `<article class="modal-wrap" data-aos="zoom-in" data-aos-duration="300">
    <figure>
      <img class="modal-img" src="${movie.Poster}" />
      <button id="close-button">Close</button>
    </figure>
    <section class="modal-content">
      <h4>Title: ${movie.Title}</h4>
      <p>Year: ${movie.Year}</p>
      <p>Rated: ${movie.Rated}</p>
      <p>Released: ${movie.Released}</p>
      <p>Runtime: ${movie.Runtime}</p>
      <p>Genre: ${movie.Genre}</p>
      <p>Director: ${movie.Director}</p>
      <p>Writer: ${movie.Writer}</p>
      <p>Actors: ${movie.Actors}</p>
      <p>Plot: ${movie.Plot}</p>
      <p>Language: ${movie.Language}</p>
      <p>Country: ${movie.Country}</p>
      <p>imdbRating: ${movie.imdbRating}</p>
      <p>Type: ${movie.Type}</p>
    </section>
  </article>`;
