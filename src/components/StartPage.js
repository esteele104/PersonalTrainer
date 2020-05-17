import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';




export default class StartPage extends React.Component {
    static navigationOptions = {
    title: "Home",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
    
   };

    render() {

        return (
          <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
        
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin',{LogType:'Trainer'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Trainer Login</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin',{LogType:'Client'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Client Login</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin', {LogType: 'Admin'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Admin Login</Text>
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
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 80,
    width: 300,
    backgroundColor: '#003b71',
    borderColor: 'white',
    //borderWidth: 5,
    borderRadius: 30,
    marginBottom: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, .30)',
    shadowOpacity: 0.9,
    //elevation: 6,
    shadowRadius: 3 ,
    shadowOffset : { width: 1, height: 13},
      
  }
});