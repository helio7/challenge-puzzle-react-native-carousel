import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

// I know these imports look a bit repetitive, but I don't
// know how to better import the images. So for the purposes
// of this demo I think I'll let it this way.
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

  const carouselData = [
    {
      key: '1',
      title: 'First Block',
      images: [img_1_1, img_1_2, img_1_3]
    },
    {
      key: '2',
      title: 'Second Block',
      images: [img_2_1, img_2_2, img_2_3]
    },
    {
      key: '3',
      title: 'Third Block',
      images: [img_3_1, img_3_2, img_3_3]
    },
    {
      key: '4',
      title: 'Fourth Block',
      images: [img_4_1, img_4_2, img_4_3]
    },
    {
      key: '5',
      title: 'Fifth Block',
      images: [img_5_1, img_5_2, img_5_3]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState(true);
  const [buttonNextDisabled, setButtonNextDisabled] = useState(false);

  const flatListRef = useRef(null);

  const scrollNext = () => {
    setCurrentIndex(currentIndex + 1);
    flatListRef.current.scrollToIndex({
      index: currentIndex + 1,
      animated: true
    });
  };

  const scrollPrevious = () => {
    setCurrentIndex(currentIndex - 1);
    flatListRef.current.scrollToIndex({
      index: currentIndex - 1,
      animated: true
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={carouselData}
          renderItem={({item}) => 
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Image
                style={styles.carouselImage}
                source={item.images[0]}
              />
            </View>}
          horizontal
          pagingEnabled={true}
          ref={flatListRef}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={scrollPrevious}
          disabled={buttonPreviousDisabled ? true : false}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={scrollNext}
          disabled={buttonNextDisabled ? true : false}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray'
  },
  carouselContainer: {
    height: Dimensions.get('window').height - 109,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    textAlign: 'center'
  },
  carouselImage: {
    width: Dimensions.get('window').width - 42,
    height: Dimensions.get('window').height - 123
  },
  buttonsContainer: {
    width: Dimensions.get('window').width - 40,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  button: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5
  }
});
