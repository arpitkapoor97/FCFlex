import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';

const MovieCard = ({ movie }) => {
    const { backdrop_path: path = '', title = '', vote_average } = movie;
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original/` + path }}
                style={styles.image}
            />
            <View style={styles.overlay}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.ratingContainer}>
                    <Entypo name="heart" size={14} color={theme.white} />
                    <Text style={styles.rating}>{vote_average}</Text>
                </View>
            </View>
        </View>
    );
};

const { theme } = require('../theme/index');
const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 2 - 16,
        backgroundColor: theme.white,
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        color: theme.white
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: theme.imagePlaceHolderGray
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
        color: theme.white,
        fontWeight: 'bold',
        fontSize: 20
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        marginLeft: 4,
        color: theme.white,
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default MovieCard;
