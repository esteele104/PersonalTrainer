import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

export default class TrainerHome extends React.Component {
    constructor(props) {
        super(props);
         }
    
    render(){
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Sessions</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Hours</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Clients</Text>
            </View>
            </TouchableOpacity>
            
            


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
    height: 36,
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});