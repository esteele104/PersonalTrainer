import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


var trainerToDisplay;

export default class ViewTrainers extends React.Component {
        constructor(props)
    {
        super();
                   
    }
    
    render(){
        const { navigation } = this.props;
        const trainer = navigation.getParam('selectedTrainer', 'NO-ID');

        return(
            
            <View style={{alignItems: 'flex-start',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             <ScrollView>
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Netpass Username: {trainer.Netpass}</Text>
            
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> First Name: {trainer.Firstname}</Text>
     
            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Last Name:{trainer.Lastname}</Text>
        
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Email: {trainer.Email}</Text>

            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Password: {trainer.Password}</Text>

            </View>
            <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('EditInformation',{type:'trainer',trainerInfo: trainer})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Edit Information</Text></Text>
            </View>
            </TouchableOpacity>
            </View>
            </ScrollView>
            
        </View>

        );
    }
}

const styles = StyleSheet.create({
  containerOuter: {
    backgroundColor: 'white',
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  containerRow: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex:1,
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    //padding: 10
  },
  containerCol: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
      //padding: 20
  },
  button: {
    backgroundColor: '#003b71',
    width: 130,
    height: 40,
    //padding: 30,
    borderRadius: 8,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
  },
  title: {
    //color: 'white',
    color: '#003b71',
    //textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  info: {
    color: '#003b71',
    fontSize: 20,
    //textAlign: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
      
  },
  buttonWrapper: {
    padding: 10
  },
  infoLabel :{
    color: '#003b71',
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  Scroll: {
      //backgroundColor: 'rgba(0,0,0,0)',
    flex:5,
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    //padding: 10
  }
});