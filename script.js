const searchButton = async () => {
  try {
    const inputKeyword = document.getElementById("input-keyword");
    const movies = await fetchMovies(inputKeyword.value);
    uImovie(movies);
    inputKeyword.value = "";
  } catch (error) {
    uImovieError(error);
  }
};

const uImovieError = (error) => {
  const modalErrorContainer =
    document.getElementsByClassName("modal-error-wrap")[0];
  modalErrorContainer.style.display = "flex";
  modalErrorContainer.innerHTML = showError(error);
  document.addEventListener("click", () => {
    modalErrorContainer.style.display = "none";
  });
};

const showError = (e) =>
  `<section class="modal-error" data-aos="fade-down" data-aos-duration="200">${e}</section>`;

const fetchMovies = (value) =>
  fetch(`https://www.omdbapi.com/?apikey=db87e2cb&s=${value}`)
    .then((response) => {
      if (response.ok === true) return response.json();
      throw new Error(response.status);
    })
    .then((response) => {
      if (response.Response === "True") return response.Search;
      throw new Error(response.Error);
    });

const uImovie = (movies) => {
  let cards = "";
  for (const movie of movies) {
    cards += showMovie(movie);
  }
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = cards;
};

const showMovie = (movie) =>
  `<section class="card">
      <figure>
        <img src="${movie.Poster}" />
      </figure>
      <button class="movie-detail-button" data-imdbid="${movie.imdbID}">
        Movie Detail
      </button>
    </section>`;

document.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("movie-detail-button")) {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await fetchMovieDetail(imdbid);
      uImoviDetail(movieDetail);
    }
  } catch (error) {
    alert(error);
  }
});

const fetchMovieDetail = (imdbid) =>
  fetch(`https://www.omdbapi.com/?apikey=db87e2cb&i=${imdbid}`)
    .then((response) => {
      if (response.ok === true) return response.json();
      throw new Error(response.status);
    })
    .then((response) => response);

const uImoviDetail = (movie) => {
  const modalContainer = document.getElementsByClassName("modal")[0];
  modalContainer.style.display = "flex";
  modalContainer.innerHTML = showMovieDetail(movie);
  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "close-button" || e.target.className === "modal") {
      modalContainer.style.display = "none";
    }
  });
};

const showMovieDetail = (movie) =>
  `<article class="modal-wrap" data-aos="zoom-in" data-aos-duration="300">
    <div class="h2-text">
      <h2>tapi belum bisa di download😂🫵</h2>
    </div>
    <figure class="modal-wrap-img">
      <img class="modal-img" src="${movie.Poster}" />
      <button id="close-button">Close</button>
    </figure>
    <section class="modal-content">
      <h4>Title: ${movie.Title}</h4>
      <p>
        <strong>Year</strong>: ${movie.Year}
      </p>
      <p>
        <strong>Rated</strong>: ${movie.Rated}
      </p>
      <p>
        <strong>Released</strong>: ${movie.Released}
      </p>
      <p>
        <strong>Runtime</strong>: ${movie.Runtime}
      </p>
      <p>
        <strong>Genre</strong>: ${movie.Genre}
      </p>
      <p>
        <strong>Director</strong>: ${movie.Director}
      </p>
      <p>
        <strong>Writer</strong>: ${movie.Writer}
      </p>
      <p>
        <strong>Actors</strong>: ${movie.Actors}
      </p>
      <p>
        <strong>Plot</strong>: ${movie.Plot}
      </p>
      <p>
        <strong>Language</strong>: ${movie.Language}
      </p>
      <p>
        <strong>Country</strong>: ${movie.Country}
      </p>
      <p>
        <strong>imdbRating</strong>: ${movie.imdbRating}
      </p>
      <p>
        <strong>Type</strong>: ${movie.Type}
      </p>
    </section>
  </article>`;
