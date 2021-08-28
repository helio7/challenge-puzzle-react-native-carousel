import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button ( { disabled, pressCallback, text } ) {
   return (
      <TouchableOpacity style={disabled ? styles.disabledButton : styles.button} onPress={pressCallback}
         disabled={disabled ? true : false}>
         <Text style={{color: disabled ? '#666666' : 'black'}}>{text}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
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