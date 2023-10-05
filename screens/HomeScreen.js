import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { getAllMovieGenres } from "../api/movieDB";
import Header from "../components/Header";
import GenreListCarousel from "../components/GenreListCarousel";
import MovieListContainer from "../components/MovieListContainer";
import { theme } from "../theme";

const HomeScreen = () => {
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const getGenres = async () => {
        const genreData = await getAllMovieGenres();
        if (genreData) setAllGenres(genreData.genres);
    }

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <GenreListCarousel allGenres={allGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            <MovieListContainer selectedGenres={selectedGenres} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundGray,
        paddingTop: Platform.OS === "android" ? 35 : 0
    }
});


export default HomeScreen;