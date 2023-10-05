import { memo } from "react";
import { useEffect, useRef, useState } from "react"
import { View, Text, SectionList, StyleSheet, ActivityIndicator } from "react-native"
import MovieCard from "./MovieCard";
import { getMovieForYear } from "../api/movieDB";
import { theme } from "../theme";

const INITIAL_YEAR = 2012;

const MovieListContainer = ({ selectedGenres }) => {
    const listRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [moviesSection, setMoviesSection] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isApplyingGenre, setIsApplyingGenre] = useState();

    const fetchInitialMovies = async (selectedGenres) => {
        setIsApplyingGenre(true);
        const data = await getMovieForYear(INITIAL_YEAR, selectedGenres);
        if (!data.results.length) {
            setMoviesSection([]);
            setIsApplyingGenre(false);
            return;
        };
        const newMovies = { title: INITIAL_YEAR, data: data.results };
        setMoviesSection([newMovies]);
        setIsApplyingGenre(false);
    }

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.yearHeader}>
            <Text style={styles.yearHeaderText}>{title}</Text>
        </View>
    );

    const renderMovieCard = ({ section, index, item }) => {
        let itemId = '';
        const numColumns = 2;
        if (index % numColumns !== 0) return null;
        const items = [];
        for (let i = index; i < index + numColumns; i++) {
            if (i >= section.data.length) {
                break;
            }
            itemId += item.id;
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
        const currentYear = moviesSection[moviesSection.length - 1].title;
        if (currentYear >= 2023) return;
        setIsLoading(true);
        const year = currentYear + 1;
        getMovieForYear(year, selectedGenres)
            .then(data => {
                const newMovies = [{ title: year, data: data.results }];
                setMoviesSection((m) => {
                    return m.concat(newMovies);
                });
            })
            .finally(() => setTimeout(() => {
                setIsLoading(false);
            }, 0));
    }

    const handleStartReached = async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        const currentYear = moviesSection[0].title;
        const year = currentYear - 1;
        getMovieForYear(year, selectedGenres)
            .then(data => {
                const newMovies = [{ title: year, data: data.results }];
                setMoviesSection((m) => {
                    return newMovies.concat(m);
                });
                setTimeout(() => {
                    listRef.current.scrollToLocation({ sectionIndex: 1, itemIndex: 0, viewOffset: 0, animated: false });
                }, 100);
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

    if (isApplyingGenre) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.white} />
            </View>
        )
    }

    if (!moviesSection.length) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>{'No movies found for selected genre(s)'}</Text>
            </View>
        )
    }
    
    return (
        <SectionList
            ref={listRef}
            sections={moviesSection}
            renderItem={renderMovieCard}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => item.id}
            stickySectionHeadersEnabled={false}
            getItemLayout={(data, index) => (
                { length: 100, offset: 100 * index, index }
            )}
            onEndReached={(d) => {
                if (d.distanceFromEnd > 0) {
                    handleEndReached();
                }
            }}
            initialNumToRender={20}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={theme.white} /> : null}
            ListHeaderComponent={isRefreshing ? <ActivityIndicator size="large" color={theme.white} /> : null}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    header: {
        fontSize: 32,
        backgroundColor: theme.white,
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
        color: theme.white,
        fontSize: 24
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        color: theme.white,
        fontSize: 16
    }
});

export default memo(MovieListContainer);