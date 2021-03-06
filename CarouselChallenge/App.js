import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import carouselData, { placeholder_image } from './src/data';
import { randomNumberBetweenZeroAnd } from './src/utils';
import Button from './src/components/Button';

export default function App() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState(true);
  const [buttonNextDisabled, setButtonNextDisabled] = useState(false);

  // An array with indexes that indicate which images each block must show.
  const [randomImagesIndexes, setRandomImagesIndexes] = useState([]);

  const flatListRef = useRef(null);

  // Method to register page changes when swiping the screen.
  const onViewRef = useRef(async (viewableItems) => {

    // If exactly 3 items are viewable after scrolling, we have to
    // guess and update the current position index of the state.
    // And also properly update the state of the buttons. 
    if (viewableItems.viewableItems.length === 3) {

      // The carousel shows a maximum of 3 items.
      // The final index we have to set in the state
      // corresponds to the index of the first item.
      const newIndex = viewableItems.viewableItems[0].index;
      await updateCurrentIndexAndSave(newIndex);

      // We get information about which item triggered
      // this event when becoming viewable. If this item
      // is the one on the left, the user scrolled to the left.
      if (viewableItems.changed[0].index === viewableItems.viewableItems[0].index) {
        
        // If we arrived to the left end, disable the "Previous" button.
        if (newIndex === 0) await updatePreviousButtonStatusAndSave(true);
        
        // If we moved to the left, we should be able to go to the right.
        await updateNextButtonStatusAndSave(false);

      } else if (viewableItems.changed[0].index === viewableItems.viewableItems[2].index) {
        
        // If we arrived to the right end, disable the "Next" button.
        if (newIndex === carouselData.length - 3) await updateNextButtonStatusAndSave(true);
        
        // If we moved to the right, we should be able to go to the left.
        updatePreviousButtonStatusAndSave(false);

      }

    }

  });

  // A page change through swiping happens when a new item is X% visible.
  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 });

  useEffect(() => {
    // If the random indexes are not initialized, initialize them.
    if (randomImagesIndexes.length === 0) {
      const imagesIndexes = [];
      for (const dataItem of carouselData) {
        imagesIndexes.push(
          randomNumberBetweenZeroAnd(dataItem.images.length - 1)
        );
      }
      setRandomImagesIndexes(imagesIndexes);
    }
    readData();
  }, [])

  const readData = async () => {
    try {
      let index = await AsyncStorage.getItem('@currentIndex');
      if (index !== null) setCurrentIndex(parseInt(index));
      let previousDisabled = await AsyncStorage.getItem('@buttonPreviousDisabled');
      if (previousDisabled === '1') setButtonPreviousDisabled(true);
      let nextDisabled = await AsyncStorage.getItem('@buttonNextDisabled');
      if (nextDisabled === '1') setButtonNextDisabled(true);
    } catch (e) {
      console.log('Failed to fetch the data from storage.');
    }
  }

  const updatePreviousButtonStatusAndSave = async (newStatus) => {
    setButtonPreviousDisabled(newStatus);
    await AsyncStorage.setItem('@buttonPreviousDisabled',
      newStatus ? '1' : '0'
    );
  }

  const updateNextButtonStatusAndSave = async (newStatus) => {
    setButtonNextDisabled(newStatus);
    await AsyncStorage.setItem('@buttonNextDisabled',
      newStatus ? '1' : '0'
    );
  }

  const updateCurrentIndexAndSave = async (newIndex) => {
    setCurrentIndex(newIndex);
    await AsyncStorage.setItem('@currentIndex',
      newIndex.toString()
    );
  }

  // Executed when pressing the 'Next' button.
  const handleNextPressing = async () => {

    // If there's a showable item to the right.
    if (currentIndex < carouselData.length - 1) {
      
      // Scroll to the right.
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
        viewOffset: -10 // Items have a left margin, so we have to compensate.
      });

      // If that showable item is the last one in the carousel.
      if (currentIndex === carouselData.length - 4) await updateNextButtonStatusAndSave(true);
      await updatePreviousButtonStatusAndSave(false);
      await updateCurrentIndexAndSave(currentIndex + 1);
    }
  };

  // Executed when pressing the 'Previous' button.
  const handlePreviousPressing = async () => {

    // If there's a showable item to the left.
    if (currentIndex > 0) {

      // Scroll to the left.
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
        viewOffset: currentIndex === 1 ? 0 : -10
      });

      // If that showable item is the first one in the carousel.
      if (currentIndex === 1) await updatePreviousButtonStatusAndSave(true);
      await updateNextButtonStatusAndSave(false);
      await updateCurrentIndexAndSave(currentIndex - 1);
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
                source={
                  randomImagesIndexes.length ? 
                  item.images[randomImagesIndexes[parseInt(item.key) - 1]] :
                  placeholder_image
                }
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
        <Button disabled={buttonPreviousDisabled} pressCallback={handlePreviousPressing} text='Previous' />
        <Button disabled={buttonNextDisabled} pressCallback={handleNextPressing} text='Next' />
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
  }
});
