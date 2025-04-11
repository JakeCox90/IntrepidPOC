import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const IconTest = () => {
  return (
    <View style={styles.container}>
      <Feather name="home" size={24} color="black" />
      <Feather name="user" size={24} color="black" />
      <Feather name="grid" size={24} color="black" />
      <Feather name="search" size={24} color="black" />
      <Feather name="bookmark" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default IconTest; 