import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


//var trainers = [];

export default class SpecificClient extends React.Component {
        constructor(props)
    {
        super();
        
         this.state = {
            trainer: '',
             trainersToDisplay: [],
        }
                   
    }
async componentDidMount(){
    console.log("display", trainers);
    
    const { navigation } = this.props;
    const cInfo = navigation.getParam('selectedClient', 'NO-ID');
    
    try{
            var trainers = [];
            var CID = cInfo.ID;
            const IDtoSend = JSON.stringify(CID);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getTrainersForClient.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:IDtoSend
            });
            
            let rJSON = await response.json();
            console.log("response",rJSON);
            for (let i =0; i<rJSON.length; i++){
                trainers.push(rJSON[i])
            }
            for (let i =0; i<trainers.length; i++){
                let a = this.state.trainersToDisplay.slice(); //creates the clone of the state
                a[i] = trainers[i];
                this.setState({trainersToDisplay: a});
            }
            console.log("here",this.state.trainersToDisplay);
       
            
    }catch(error){
            console.log(error);
        }
}


    
    render(){
        const { navigation } = this.props;
        var type = navigation.getParam('type', 'NO-ID');
        const client = navigation.getParam('selectedClient', 'NO-ID');
        var sessions = [];
        sessions = navigation.getParam('sessions', 'NO-ID');
        var clients = [];
        clients = navigation.getParam('clients', 'NO-ID');
        const listItems = this.state.trainersToDisplay.map((trainer,index) => 
            <View>                                              
            <Text style={styles.infoLabel}>Assigned Trainer {(index+1)+": "}{trainer.Firstname+" "+trainer.Lastname}</Text>
            </View>
           
                );
        var admin = <TouchableOpacity>
            <View style = {styles.button}>
            <Text style={styles.buttonText}></Text>
            </View>
            </TouchableOpacity>
        if(type == 'admin'){
         admin = <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionsView',{sess: sessions,clients:clients})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View Client's Sessions</Text>
            </View>
            </TouchableOpacity>
        }
        
        
        return(
            
            <View style={{alignItems: 'flex-start',justifyContent: 'row', backgroundColor: 'white', flex: 1 }}>
             <ScrollView>
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Netpass Username: {client.Netpass}</Text>
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> First Name:{client.Firstname} </Text>
          
            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Last Name: {client.Lastname}</Text>
           
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Email:{client.Email} </Text>
            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Sessions Left: {client.SessionsRemaining} </Text>
            </View>
            
           {listItems}
            

            <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('EditInformation',{type:'client',clientInfo:client})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Edit Information</Text></Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('assignTrainer',{type:'client',clientInfo:client})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Assign a Trainer</Text></Text>
            </View>
            </TouchableOpacity>
            {admin}

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
    width: 165,
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