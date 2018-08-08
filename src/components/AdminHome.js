import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var clients = [];
var trainers = [];

export default class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            clientsToDisplay: [],
            trainersToDisplay: [],
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
            console.log(this.state.clientsToDisplay);
    }catch(error){
            console.log(error);
        }
        
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                trainers.push(rJSON[i])
            }
            for (let i =0; i<trainers.length; i++){
                let a = this.state.trainersToDisplay.slice(); //creates the clone of the state
                a[i] = trainers[i];
                this.setState({trainersToDisplay: a});
            }
            console.log(this.state.trainersToDisplay);
    }catch(error){
            console.log(error);
        }
    }
    
    render(){
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('TrainersView',{trainers: this.state.trainersToDisplay})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View All Trainers</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('ViewClients', {clients: this.state.clientsToDisplay})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View All Clients</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View All Sessions</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('CreateTrainerAcc',{type:'Trainer'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Add Trainer</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('CreateAccount',{type:'Client'})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Add Client</Text>
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