import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FCLogo = require('../assets/fc-icon.webp');

const Header = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={FCLogo} style={styles.headerLogo} />
                <Text style={styles.headerText}>
                    {'Flex'}
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Feather
                    name="search"
                    size={40}
                    color={theme.white}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const { theme } = require('../theme/index');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 30
    },
    headerContainer: {
        marginLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    headerLogo: {
        height: 51,
        width: 51
    },
    headerText: {
        paddingLeft: 10,
        color: theme.brandColor,
        fontSize: 51,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});


export default Header;