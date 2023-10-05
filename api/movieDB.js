// api.js
import { API_KEY, BASE_URL } from '../constants/apiConstants';

const getAllGenresURL = `genre/movie/list?api_key=${API_KEY}`;
const getMovieByYearURL = `discover/movie?sort_by=popularity.desc&page=1&vote_count.gte=100&api_key=${API_KEY}`;
const searchMovieURL = `search/movie?api_key=${API_KEY}`

const apiCall = async (endpoint, params) => {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
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
    return apiCall(`${getAllGenresURL}`);
};

export const getMovieForYear = (year, genres = []) => {
    const withGenresString = genres.join(',').toString();
    const url = `${getMovieByYearURL}&primary_release_year=${year}`;
    if (genres.length > 0) {
        return apiCall(url + `&with_genres=${withGenresString}`);
    }
    return apiCall(url);
};

export const searchMovies = (searchText, page = 1) => {
    const url = `${searchMovieURL}&query=${searchText}&page=${page}`;
    return apiCall(url);
}