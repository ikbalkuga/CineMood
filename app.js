const moodButtons = document.querySelectorAll('.mood-buttons button');
const movieListWrapper = document.querySelector('.movieList-wrapper');

const url = 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'YOUR_API_KEY_HERE', //insert your own RapidAPI key here
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
};

let movies=[];
async function getData() {
    const response = await fetch(url, options);
    const data = await response.json();
    movies=data;
   
}
getData();
function filterMoviesByGenre(genre) {
    return movies.filter(movie => 
        movie.genres && movie.genres[0]===genre
    );
}

function showMovies(filtered) {
    movieListWrapper.innerHTML = '';
    if (filtered.length === 0) {
        movieListWrapper.innerHTML = '<p>No movies found for this mood.</p>';
        return;
    }
    filtered.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = `
            <img src="${movie.primaryImage || 'https://via.placeholder.com/150x220?text=No+Image'}" alt="${movie.primaryTitle}" class="movie-poster">
            <div class="movie-info">
                <strong>${movie.primaryTitle}</strong>
                <div class="movie-genres">${movie.genres.join(', ')}</div>
            </div>
        `;
        movieListWrapper.appendChild(div);
    });
}

moodButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mood = btn.textContent.trim();
        let genre = '';
        switch (mood) {
            case 'Happy': genre = 'Comedy'; break;
            case 'Sad': genre = 'Drama'; break;
            case 'Excited': genre = 'Action'; break;
            case 'Romantic': genre = 'Romance'; break;
            case 'Scary': genre = 'Horror'; break;
            case 'Random':
                if (movies.length > 0) {
                    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                    showMovies([randomMovie]);
                }
                return;
            default: genre = '';
        }
        const filtered = filterMoviesByGenre(genre);
        showMovies(filtered);
    });
});








