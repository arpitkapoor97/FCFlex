import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const GenreListCarousel = ({ allGenres, selectedGenres, setSelectedGenres }) => {
  const handleButtonPress = (item) => {
    if (selectedGenres.includes(item.id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== item.id));
    } else {
      setSelectedGenres([...selectedGenres, item.id]);
    }
  };

  const renderButton = ({ item }) => {
    const selectedStyles = selectedGenres.includes(item.id) ? [styles.selected] : [];
    const buttonStyle = [styles.genreButton, selectedStyles];
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => handleButtonPress(item)}
      >
        <Text style={styles.genreTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allGenres}
        renderItem={renderButton}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const { theme } = require('../theme/index');
const styles = StyleSheet.create({
  container: {
    marginLeft: 8
  },
  genreButton: {
    backgroundColor: theme.lightGray,
    padding: 10,
    margin: 5,
    borderRadius: 4
  },
  genreTitle: {
    color: theme.white
  },
  selected: {
    backgroundColor: theme.brandColor,
  }
});

export default GenreListCarousel;
