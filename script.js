import {apiKey, apiHost} from './api.js';
const userSearch = document.querySelector('#searchInput');
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
        const {result : {artist_names : artistName, full_title: fullTitle, header_image_thumbnail_url : thumbnails, release_date_components: releaseDate}} = hits;
    })
}

function fetchingApi (){
    fetch(`https://genius.p.rapidapi.com/search?q=${artist}`, options)
        .then(response => response.json())
        .then(response => destructuring(response))
        .catch(err => console.error(err))
}

userSearch.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){ 
        isSearching = true;
        artist = userSearch.value;
        isSearching ? fetchingApi() : isSearching = false;
    }
})

