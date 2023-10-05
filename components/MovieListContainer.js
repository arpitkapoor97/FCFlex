import { useEffect, useRef, useState } from "react"
import { View, Text, SectionList, StyleSheet, ActivityIndicator } from "react-native"
import MovieCard from "./MovieCard";
import { getMovieForYear } from "../api/movieDB";

const INITIAL_YEAR = 2012;

const MovieListContainer = ({ selectedGenres, visible }) => {
    const listRef = useRef(null);
    const yearRef = useRef(INITIAL_YEAR);
    const [isLoading, setIsLoading] = useState(false);
    const [moviesSection, setMoviesSection] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchInitialMovies = async (selectedGenres) => {
        setIsLoading(true);
        const data = await getMovieForYear(INITIAL_YEAR, selectedGenres);
        const newMovies = { title: INITIAL_YEAR, data: data.results };
        setMoviesSection([newMovies]);
        setIsLoading(false);
    }

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.yearHeader}>
            <Text style={styles.yearHeaderText}>{title}</Text>
        </View>
    );

    const renderMovieCard = ({ section, index, item }) => {
        // return <MovieCard movie={item}/>;
        let itemId = '';
        const numColumns = 2;
        if (index % numColumns !== 0) return null;
        const items = [];
        for (let i = index; i < index + numColumns; i++) {
            if (i >= section.data.length) {
                break;
            }
            itemId += item.id;
            // console.log(section.data[i]);
            items.push(<MovieCard key={section.data[i].id} movie={section.data[i]} />);
        }
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
                key={itemId}
            >
                {items}
            </View>
        );
    }

    const handleEndReached = async () => {
        if (isLoading) return;
        const currentYear = yearRef.current;
        if (currentYear >= 2023) return;
        setIsLoading(true);
        const year = currentYear + 1;
        getMovieForYear(year, selectedGenres)
            .then(data => {
                const newMovies = [{ title: year, data: data.results }];
                setMoviesSection((m) => {
                    return m.concat(newMovies);
                });
                yearRef.current = year;
            })
            .finally(() => setTimeout(() => {
                setIsLoading(false);
            }, 0));
    }

    const handleStartReached = async () => {
        const currentYear = yearRef.current;
        setIsRefreshing(true);
        const year = currentYear - 1;
        getMovieForYear(year, selectedGenres)
            .then(data => {
                const newMovies = [{ title: year, data: data.results }];
                // const movieHeight = (newMovies[0].data.length / 2) * 220 + 20;
                setMoviesSection((m) => {
                    return newMovies.concat(m);
                });
                setTimeout(() => {
                    // const wait = new Promise(resolve => setTimeout(resolve, 500));
                    // const currentIndex = moviesSection.findIndex(item => item.title === currentYear);
                    listRef.current.scrollToLocation({ sectionIndex: 1, itemIndex: 0, viewOffset: 0, animated: false });
                    // listRef.current.scrollToLocation({ viewPosition: 0, animated: false });
                }, 100);
                yearRef.current = year;
            })
            .finally(() => setTimeout(() => {
                setIsRefreshing(false)
            }, 2000));
    }

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;


        if (scrollY <= 0 && !isRefreshing) {
            handleStartReached();
        }
    }

    useEffect(() => {
        fetchInitialMovies(selectedGenres);
    }, [selectedGenres]);

    // if (isLoading || isRefreshing) {
    //     return <ActivityIndicator size="large" color="white" />;
    // }

    if(!visible) return null;

    return (
        <SectionList
            ref={listRef}
            sections={moviesSection}
            renderItem={renderMovieCard}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index}
            stickySectionHeadersEnabled={false}
            // onEndReached={handleEndReached}
            onEndReached={(d) => {
                if (d.distanceFromEnd > 0) {
                    handleEndReached();
                }
            }}
            initialNumToRender={20}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="white" /> : null}
            ListHeaderComponent={isRefreshing ? <ActivityIndicator size="large" color="white" /> : null}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
    yearHeader: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    yearHeaderText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 24
    }
});


export default MovieListContainer;