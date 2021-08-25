import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import img_1_1 from './assets/1_1.jpg';
import img_1_2 from './assets/1_2.jpg';
import img_1_3 from './assets/1_3.jpg';
import img_2_1 from './assets/2_1.jpg';
import img_2_2 from './assets/2_2.jpg';
import img_2_3 from './assets/2_3.jpg';
import img_3_1 from './assets/3_1.jpg';
import img_3_2 from './assets/3_2.jpg';
import img_3_3 from './assets/3_3.jpg';
import img_4_1 from './assets/4_1.jpeg';
import img_4_2 from './assets/4_2.jpg';
import img_4_3 from './assets/4_3.jpg';
import img_5_1 from './assets/5_1.jpg';
import img_5_2 from './assets/5_2.jpg';
import img_5_3 from './assets/5_3.jpg';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
