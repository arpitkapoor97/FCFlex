import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const GenreListCarousel = ({ allGenres, selectedGenres, setSelectedGenres, visible }) => {

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
        <Text style={{ color: 'white' }}>{item.name + item.id}</Text>
      </TouchableOpacity>
    );
  };

  if (!visible) return null;

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

const styles = StyleSheet.create({
  container: {
    marginLeft: 8
  },
  genreButton: {
    backgroundColor: '#484848',
    padding: 10,
    margin: 5,
    borderRadius: 4
  },
  selected: {
    backgroundColor: '#FB5204',
  }

});

export default GenreListCarousel;
