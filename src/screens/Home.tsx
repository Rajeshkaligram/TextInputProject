import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextInputComponent from '../common/TextInputComponent';
import { colors, fonts } from '../common';

const Home = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Text Input Project</Text>
      <TextInputComponent
        placeholder="Enter Value..."
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 50,
    fontFamily: fonts.bold,
  },
});
