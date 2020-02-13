import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import email from 'react-native-email';


export default class viewHours extends React.Component {
    constructor(props)
    {
        super();
        
        this.state = {
            clientsToDisplay : [],
             sessions : [],
             trainerSes: [],
             clientSes: [],
             clientsToSend: [],
             trainerInfo: '',
         }
                    
    }
    async componentDidMount(){
    const { navigation } = this.props;
    netpass = navigation.getParam('inNetpass', 'NO-ID');
    try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getAllSession.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
           let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                let a = this.state.sessions.slice(); //creates the clone of the state
                a[i] = rJSON[i];
                this.setState({sessions: a});
            }
            
           
        for (let i =0; i<this.state.sessions.length; i++){
                if(this.state.sessions[i].AssignedTo == netpass){
        
                    let a = this.state.clientSes.slice(); //creates the clone of the state
                    a[i] = this.state.sessions[i];
                    this.setState({clientSes: a});
                }
            }
             console.log("mysess",this.state.clientSes);
        
            
    }catch(error){
            console.log(error);
        }
}

    render(){
         const { navigation } = this.props;
       
        var myHours = this.state.clientSes.length;
        return(
            <View>
            <Text> Total Hours: {myHours} </Text>
            </View>
        );
    }
}