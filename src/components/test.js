import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';



export default class StartPage extends React.Component {
    render() {

        return (

        
          <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
            
            <TouchableOpacity >
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Test</Text>
            </View>
            </TouchableOpacity>


          </View>
        </View>

        );
      }
    }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    //flex: 1
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    //fontStyle: 'normal',
  },
  button: {
    //width: 200,
    height: 70,
    backgroundColor: '#003b71',
    //borderColor: 'white',
    //borderWidth: 5,
    borderRadius: 50,
    marginBottom: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, .30)',
    shadowOpacity: .9,
    shadowRadius: 3 ,
    shadowOffset : { width: 1, height: 13},
      
  }
});