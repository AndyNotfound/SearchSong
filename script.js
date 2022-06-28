import {apiKey, apiHost} from './api.js';
const userSearch = document.querySelector('#searchInput');
const container = document.querySelector('#container')
let artist, isSearching;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': apiHost
	}
};

function destructuring (res){
    const {response: {hits}} = res;
    hits.forEach(hits => {
        const {result : {artist_names : artistName, full_title: fullTitle, header_image_thumbnail_url : thumbnails, release_date_for_display: releaseDate}} = hits;
        render(artistName, fullTitle, thumbnails, releaseDate);
    })
}

function render (artistName, fullTitle, thumbnails, releaseDate){
    var div = document.createElement('div');
    div.setAttribute('class', 'flex flex-col w-64 h-70');
    div.innerHTML = `
    <img src="${thumbnails}" alt="" class="rounded w-64 h-64">
    <div class="p-4 flex flex-col gap-y-1">
        <h2 class="text-2xl font-medium">${artistName}</h2>
        <h4 class="text-base">${fullTitle}</h4>
        <p class="text-sm">${releaseDate}</p>
    </div>
    `;
    container.appendChild(div);
    isSearching = true;
}

function fetchingApi (){
    fetch(`https://genius.p.rapidapi.com/search?q=${artist}`, options)
        .then(response => response.json())
        .then(response => destructuring(response))
        .catch(err => console.error(err))
}

userSearch.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){
        artist = userSearch.value;
        if (isSearching){
            while (container.firstChild){
                container.removeChild(container.lastChild);
            }
            isSearching = false;
            fetchingApi();
        } else {
            fetchingApi ();
        }
    }
})