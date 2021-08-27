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

  // Method to register page changes when swiping the screen.
  const onViewRef = useRef((viewableItems) => {

    // If exactly 3 items are viewable after scrolling, we have to
    // guess and update the current position index of the state.
    // And also properly update the state of the buttons. 
    if (viewableItems.viewableItems.length === 3) {

      // The carousel shows a maximum of 3 items.
      // The final index we have to set in the state
      // corresponds to the index of the first item.
      const newIndex = viewableItems.viewableItems[0].index;
      setCurrentIndex(newIndex);

      // We get information about which item triggered
      // this event when becoming viewable. If this item
      // is the one on the left, the user scrolled to the left.
      if (viewableItems.changed[0].index === viewableItems.viewableItems[0].index) {
        
        // If we arrived to the left end, disable the "Previous" button.
        if (newIndex === 0) setButtonPreviousDisabled(true)
        
        // If we moved to the left, we should be able to go to the right.
        setButtonNextDisabled(false);

      } else if (viewableItems.changed[0].index === viewableItems.viewableItems[2].index) {
        
        // If we arrived to the right end, disable the "Next" button.
        if (newIndex === carouselData.length - 3) setButtonNextDisabled(true);
        
        // If we moved to the right, we should be able to go to the left.
        setButtonPreviousDisabled(false);

      }

    }

  });

  // A page change through swiping happens when a new item is X% visible.
  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 });

  const scrollNext = () => {
    if (currentIndex < carouselData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
        viewOffset: -10
      });
      if (currentIndex === carouselData.length - 4) setButtonNextDisabled(true);
      setButtonPreviousDisabled(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollPrevious = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
        viewOffset: currentIndex === 1 ? 0 : -10
      });
      if (currentIndex === 1) setButtonPreviousDisabled(true);
      setButtonNextDisabled(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={carouselData}
          renderItem={({item}) => 
            <View style={{
              marginLeft: item.key === '1' ? 0 : 10,
              borderWidth: 1,
              borderRadius: 10
            }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Image
                style={styles.carouselImage}
                source={item.images[0]}
              />
            </View>}
          horizontal
          ref={flatListRef}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          snapToInterval={(Dimensions.get('window').width - 60) * 0.3 + 12}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={buttonPreviousDisabled ? styles.disabledButton : styles.button} onPress={scrollPrevious}
          disabled={buttonPreviousDisabled ? true : false}>
          <Text style={{color: buttonPreviousDisabled ? '#666666' : 'black'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonNextDisabled ? styles.disabledButton : styles.button} onPress={scrollNext}
          disabled={buttonNextDisabled ? true : false}>
          <Text style={{color: buttonNextDisabled ? '#666666' : 'black'}}>Next</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'lightgray',
    height: Dimensions.get('window').height,
  },
  carouselContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    textAlign: 'center'
  },
  carouselImage: {
    width: (Dimensions.get('window').width - 60) * 0.3,
    height: (Dimensions.get('window').width - 60) * 0.3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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
  disabledButton: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: '#999999', // Different from 'button' style
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc', // Different from 'button' style
    borderRadius: 5
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
