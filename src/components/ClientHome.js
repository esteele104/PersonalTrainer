import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
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
            selectedClient: [],
        }
         }
     async componentDidMount() {
          const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');
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
                if(clients[i].Netpass ==netpass){
                    this.setState({selectedClient:clients[i]})
                }   
            }
            
    }catch(error){
            console.log(error);
        }
          const toSendStr = JSON.stringify({Fname: this.state.selectedClient.Firstname,Lname:this.state.selectedClient.Lastname});
         console.log('ss',toSendStr);
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getSessions.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr,
            });
            //console.log(response);
           let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                let a = this.state.sessions.slice(); //creates the clone of the state
                a[i] = rJSON[i];
                this.setState({sessions: a});
            }
            
            
        
            
    }catch(error){
            console.log(error);
        }
         
    }
    
    render(){
        console.log("clients",clients);
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             


            <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionsView',{sess: this.state.sessions,clients:clients})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Sessions</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('passwordChange',{info: this.state.selectedClient, type:'Clients'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
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