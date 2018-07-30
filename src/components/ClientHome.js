import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var clientToSend;
var clients = [];

export default class ClientHome extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            clientsToDisplay : [],
        }
         }
     async componentDidMount() {
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getClients.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                clients.push(rJSON[i])
            }
            for (let i =0; i<clients.length; i++){
                let a = this.state.clientsToDisplay.slice(); //creates the clone of the state
                a[i] = clients[i];
                this.setState({clientsToDisplay: a});
            }
        
            
    }catch(error){
            console.log(error);
        }
    }
    
    render(){
        const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');
        for (let i =0; i<this.state.clientsToDisplay.length; i++){
                if(this.state.clientsToDisplay[i].Netpass == netpass){
        
                    clientToSend = this.state.clientsToDisplay[i];
                }
            }
            console.log(clientToSend);
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionSignUp',{client:clientToSend})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Sign up for a session</Text>
            </View>
            </TouchableOpacity>


            <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionsView')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Sessions</Text>
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