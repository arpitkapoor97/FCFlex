import { SafeAreaView, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import MovieSearchList from "../components/MovieSearchList";

const SearchScreen = () => {

    const [debouncedSearchText, setDebouncedSearchText] = useState("");

    useEffect(() => {
        console.log(debouncedSearchText);
    }, [debouncedSearchText]);

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar debouncedSearchText={debouncedSearchText} setDebouncedSearchText={setDebouncedSearchText} />
            <MovieSearchList searchText={debouncedSearchText} />
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});

export default SearchScreen;