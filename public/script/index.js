const API_KEY = 'api_key=1563b7aa6fab2a5e4a6839fbbd6823ea';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/search/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const search = document.getElementById("search");
const main = document.getElementById("main");

function getMovies(url)
{
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data)
{
    main.innerHTML = '';
    let i = 0;
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            
            <div class="overview">
                <div class="o-a">
                    <h3>Overview</h3>
                    <button class="add green" value = ${i} onClick="async playlist.append(JSON.parse.getItem((${title})))">+</button>
                </div>
                ${overview}
            </div>`

        
        main.appendChild(movieEl);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm)
    {
        getMovies(API_URL+'&query='+searchTerm);
    }
})

function getColor(vote)
{
    if(vote>=7.5)
    {
        return 'green'
    }
    else if(vote>=5)
    {
        return 'orange'
    }
    else
    {
        return 'red'
    }
}