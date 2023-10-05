import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigation from './navigation/appNavigation';
// import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  }
});
