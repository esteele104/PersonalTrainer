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
            sessions : [],
            clientSes: [],
        }
         }
     async componentDidMount() {
          const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getSessions.php',{
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
        
            
    }catch(error){
            console.log(error);
        }
         
    }
    
    render(){
        
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             


            <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionsView',{sess: this.state.clientSes})}>
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