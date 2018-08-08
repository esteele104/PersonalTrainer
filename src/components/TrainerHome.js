import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var clientToSend = '';
var clients = [];
var trainer=  "";
var myClients = [];

export default class TrainerHome extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            clientsToDisplay : [],
             sessions : [],
             trainerSes: [],
             clientSes: [],
             clientsToSend: [],
             
             
             
        }
         }
     async componentDidMount() {
        const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');
         try{
             const toSendStr = JSON.stringify({uname: netpass});
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
             trainer = rJSON;
             console.log(rJSON);
         }catch(error){
            console.log(error);
        }
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
            
            for (let i =0; i<this.state.clientsToDisplay.length; i++){
                if(this.state.clientsToDisplay[i].Netpass == netpass){
        
                    clientToSend = this.state.clientsToDisplay[i];
                }
            }
            for (let i =0; i<this.state.sessions.length; i++){
                for(let j =0; j<this.state.clientsToDisplay.length; j++){
                if(this.state.clientsToDisplay[j].Firstname== this.state.sessions[i].ClientFirstName && this.state.clientsToDisplay[j].Lastname == this.state.sessions[i].ClientLastName && this.state.sessions[i].AssignedTo == netpass){
                   myClients.push(this.state.clientsToDisplay[j]);
                }
            }
            }
            for(let i =0; i<myClients.length; i++){
                let a = this.state.clientsToSend.slice(); //creates the clone of the state
                a[i] = myClients[i];
                this.setState({clientsToSend: a});
            }
       
            
    }catch(error){
            console.log(error);
        }
    }
    
    render(){
    
        const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
             <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionSignUp',{client:clientToSend,inNetpass:netpass})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Sign up for a session</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('viewMySessionsT',{inNetpass:netpass, sess: this.state.clientSes})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Sessions</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View My Hours</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('ViewMyClients',{myClients: this.state.clientsToSend})}>
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