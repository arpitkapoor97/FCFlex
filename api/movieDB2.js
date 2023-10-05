
// const apiBaseURL = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d`
const apiBaseURL = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100`
// const url = ``

const getAllGenresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100`;
const getMovieByYearURL = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&page=1&vote_count.gte=100`

const apiCall = async (endpoint, params) => {
    const url = new URL(endpoint);
    
    if (params) {
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
    }
    try {
        const response = await fetch(url.toString(), {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error: ', error);
        return {};
    }
};


export const getAllMovieGenres = () => {
    return apiCall(getAllGenresURL);
}

export const getMovieForYear = (year, genres = []) => {
    if (genres.length > 0) {
        const withGenresString = genres.join(',').toString();
        return apiCall(`${getMovieByYearURL}&primary_release_year=${year}&with_genres=${withGenresString}`)
    }
    return apiCall(`${getMovieByYearURL}&primary_release_year=${year}`)
}


