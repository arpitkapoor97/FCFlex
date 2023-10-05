import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ debouncedSearchText, setDebouncedSearchText }) => {

    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [searchText]);

    useEffect(() => {
        // console.log(debouncedSearchText);
    }, [debouncedSearchText]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search Movies..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={'white'}
                rightIcon={
                    <TouchableOpacity onPress={() => setSearchText('')}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity onPress={() => setSearchText('')}>
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e1e1e",
        padding: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        color: 'white',
        marginLeft: 16
    },
});


export default SearchBar;
