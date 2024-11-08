import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.main}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})