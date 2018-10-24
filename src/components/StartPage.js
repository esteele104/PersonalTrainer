import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

export default class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LogType: ''
        }
         }
    
    render() {

        return (

        
          <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
        
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin',{LogType:'Trainer'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Trainer</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin',{LogType:'Client'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Client</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('Admin', {LogType: 'Admin'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Admin</Text>
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
    backgroundColor: '#003b71',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 50,
    marginBottom: 50,
    alignSelf: 'stretch',
    justifyContent: 'center'
      
  }
});