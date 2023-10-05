import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { searchMovies } from "../api/movieDB";
import MovieCard from "../components/MovieCard"


const MovieSearchList = ({ searchText }) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState([]);

    const fetchMovies = async () => {
        const data = await searchMovies(searchText);
        // console.log(data);
        const searchedMovies = data.results;
        setMovies(searchedMovies);
    };

    const renderMovieCard = ({ item }) => {
        return <MovieCard movie={item} />
    }

    useEffect(() => {
        if (searchText.length > 1) fetchMovies();
        if (searchText.length == 0) setMovies([]);
    }, [searchText]);

    return (
        <FlatList
            data={movies}
            renderItem={renderMovieCard}
            numColumns={2}
            keyExtractor={item => item.id}
            initialNumToRender={10}
        />
    )
}

export default MovieSearchList;