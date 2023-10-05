import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
}

const { theme } = require('./theme/index');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundGray,
  }
});
