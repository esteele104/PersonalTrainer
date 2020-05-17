import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import email from 'react-native-email';



var trainerToDisplay;
var toSend;

export default class SpecificSessC extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainer: '',
        }
                   
    }
    /*
    Fetches all the trainer data associated with the selected session.
    */
     async componentDidMount(){
        const { navigation } = this.props;
       const session = navigation.getParam('selectedSess', 'NO-ID');

         try{
             const toSendStr = JSON.stringify({uname: session.AssignedTo});
             console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getSpecificTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr
            });
            //console.log(response);
           let rJSON = await response.json();
             this.setState({trainer : rJSON});
             console.log(rJSON);
         }catch(error){
            console.log(error);
        }
    
    }
    
   
                                           
    render(){
        const { navigation } = this.props;
        const session = navigation.getParam('selectedSess', 'NO-ID');
        console.log("session",session);
        var listOfSessions = [];
        listOfSessions = navigation.getParam('SessionsToSend', 'NO-ID');
        var type = navigation.getParam('type', 'NO-ID');
        var clientInfo = {
            firstname: session.ClientFirstName,
            lastname: session.ClientLastName,
            email: session.ClientEmail,
        };
        
        
        return(
             <View style={{alignItems: 'flex-start',justifyContent: 'center', backgroundColor: 'white'}}>
            
            <View>
                <Text style={styles.infoLabel}> Client Firstname: {session.ClientFirstname}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Client Lastname: {session.ClientLastname}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Client Email: {session.ClientEmail}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Client Phone Number: {session.ClientPhoneNumber}</Text>
            
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Assigned To: {session.AssignedTo}</Text>
            
            </View>
            <View >
                <Text style={styles.infoLabel}> Trainer Email: {this.state.trainer.Email}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Date & Time: {session.Date}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Workout: {session.Workout}</Text>
            </View>
            </View>
            
           
)}
}



const styles = StyleSheet.create({
  containerOuter: {
    backgroundColor: 'white',
    flex:1,
    alignItems: 'center',
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
