// Importing your API Key and API host, you can get them at https://rapidapi.com/brianiswu/api/genius/
import {apiKey, apiHost} from './api.js';

// taking our html element and assign them to a variable
const userSearch = document.querySelector('#searchInput');
const container = document.querySelector('#container')

// some variables we'll use later
let artist, isSearching;

// your HTTP request type and your API host and API key for the API header
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': apiHost
	}
};

// function to destructure the API response
function destructuring (res){
    const {response: {hits}} = res;

    // looping through the responses and destructure the API response and assign each of those values to a variable
    hits.forEach(hits => {
        const {result : {artist_names : artistName, full_title: fullTitle, header_image_thumbnail_url : thumbnails, release_date_for_display: releaseDate}} = hits;

        // Calling render function and passing those variables
        render(artistName, fullTitle, thumbnails, releaseDate);
    })
}

// function to render the API response to the web
function render (artistName, fullTitle, thumbnails, releaseDate){

    // making a new html element and setting the class of that element, then inserting html element with the API response included
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

    // appending all of them to the container (line 6)
    container.appendChild(div);

    // setting isSearching to true to edit the rendered element later
    isSearching = true;
}

// function to fetch or requesting data from Genius based on user search queries
function fetchingApi (){
    fetch(`https://genius.p.rapidapi.com/search?q=${artist}`, options)
        .then(response => response.json())

        // passing the response to destructuring function to destructure them
        .then(response => destructuring(response))

        // catching the error and make a log
        .catch(err => console.error(err))
}

// serch box event
userSearch.addEventListener('keypress', (event) => {

    // if the user hit enter this code will run
    if (event.key === 'Enter'){

        // getting the search box value and assign that to a variable
        artist = userSearch.value;

        // if isSearching is true (false by default), delete the rendered value and set isSearching back to false.
        if (isSearching){
            while (container.firstChild){
                container.removeChild(container.lastChild);
            }
            isSearching = false;

            // call fetchingApi function
            fetchingApi();
        }

        // if isSearching is false (which is the default), call fetchingApi function 
        else {
            fetchingApi ();
        }
    }
})