import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { searchMovies } from "../api/movieDB";
import MovieCard from "../components/MovieCard"
import { theme } from "../theme";

const MovieSearchList = ({ searchText }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        setIsLoading(true);
        const data = await searchMovies(searchText);
        const searchedMovies = data.results;
        setMovies(searchedMovies);
        setIsLoading(false);
    };

    const renderMovieCard = ({ item }) => {
        return <MovieCard movie={item} />
    }

    useEffect(() => {
        if (searchText.length > 1) fetchMovies();
        if (searchText.length == 0) setMovies([]);
    }, [searchText]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.white} />
            </View>
        )
    }

    if (searchText.length > 0 && movies.length == 0) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>{'No movies found..'}</Text>
            </View>
        )
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFoundText: {
        color: theme.white,
        fontSize: 20
    }
});


export default MovieSearchList;