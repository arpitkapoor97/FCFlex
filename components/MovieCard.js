import React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";

const MovieCard = ({ movie }) => {
    const { backdrop_path: uri = '', title = '' } = movie;
    return (
        <View style={styles.card}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/` + movie.backdrop_path }} style={styles.image} />
            <View style={styles.overlay}>
                <Text numberOfLines={1} style={styles.title}>{movie.title}</Text>
                <Text style={styles.rating}>{movie.vote_average}</Text>
                <Text style={styles.rating}>{movie.genre_ids.join(',').toString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 2 - 16,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        color: 'white'
    },
    image: {
        width: '100%',
        height: 200,
    },
    overlay: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    rating: {
        color: 'white',
    }
});

export default MovieCard;
