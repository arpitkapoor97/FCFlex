import { useEffect, useState } from "react";
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { getAllMovieGenres } from "../api/movieDB";
import Header from "../components/Header";
import GenreListCarousel from "../components/GenreListCarousel";
import MovieListContainer from "../components/MovieListContainer";
import SearchBar from "../components/SearchBar";



const HomeScreen = () => {
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const onSearch = (text) => {
        // setSearchText(text);
    };

    const toggleSearchBar = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
    };

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
            <GenreListCarousel allGenres={allGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} visible={!isSearchBarOpen} />
            <MovieListContainer selectedGenres={selectedGenres} visible={!isSearchBarOpen} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});


export default HomeScreen;