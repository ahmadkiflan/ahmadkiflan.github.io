const searchButton = async () => {
  const inputSearch = document.getElementById("input-search");
  const value = inputSearch.value;
  inputSearch.value = "";
  const movies = await getMovies(value);
  uImovies(movies);
};

const getMovies = (inputKeyword) =>
  fetch(`https://www.omdbapi.com/?apikey=db87e2cb&s=${inputKeyword}`)
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
  fetch(`https://www.omdbapi.com/?apikey=db87e2cb&i=${imdbid}`)
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
    <figure class="modal-wrap-img">
      <img class="modal-img" src="${movie.Poster}" />
      <button id="close-button">Close</button>
    </figure>
    <section class="modal-content">
      <h4>Title: ${movie.Title}</h4>
      <p>
        <strong>Year</strong>: ${movie.Year}
      </p>
      <p><strong>Rated</strong>: ${movie.Rated}</p>
      <p><strong>Released</strong>: ${movie.Released}</p>
      <p><strong>Runtime</strong>: ${movie.Runtime}</p>
      <p><strong>Genre</strong>: ${movie.Genre}</p>
      <p><strong>Director</strong>: ${movie.Director}</p>
      <p><strong>Writer</strong>: ${movie.Writer}</p>
      <p><strong>Actors</strong>: ${movie.Actors}</p>
      <p><strong>Plot</strong>: ${movie.Plot}</p>
      <p><strong>Language</strong>: ${movie.Language}</p>
      <p><strong>Country</strong>: ${movie.Country}</p>
      <p><strong>imdbRating</strong>: ${movie.imdbRating}</p>
      <p><strong>Type</strong>: ${movie.Type}</p>
    </section>
  </article>`;
