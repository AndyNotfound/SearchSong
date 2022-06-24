const userSearch = document.querySelector('#searchInput');

userSearch.addEventListener('keypress', (event) => {
    if (event.key === 'Enter'){ 
        isSearching = true;
        artist = userSearch.value;
        isSearching ? fetchingApi() : isSearching = false;
    }
})

