import { SafeAreaView, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import MovieSearchList from "../components/MovieSearchList";
import { theme } from "../theme";

const SearchScreen = () => {

    const [debouncedSearchText, setDebouncedSearchText] = useState("");

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
        backgroundColor: theme.backgroundGray,
        paddingTop: Platform.OS === "android" ? 40 : 0
    }
});

export default SearchScreen;