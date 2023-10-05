import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";

const SearchBar = ({ setDebouncedSearchText }) => {

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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="arrowleft" size={24} color={theme.white} />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Search Movies..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={theme.white}
                rightIcon={
                    <TouchableOpacity onPress={() => setSearchText('')}>
                        <AntDesign name="close" size={24} color={theme.white} />
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity style={styles.crossIcon} onPress={() => setSearchText('')}>
                <AntDesign name="closecircleo" size={24} color={theme.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.searchBarBackground,
        padding: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        color: theme.white,
        marginLeft: 16
    },
    crossIcon: {
        position: 'absolute',
        right: 20
    }
});


export default SearchBar;
