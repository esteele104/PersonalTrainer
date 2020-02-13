import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


var trainerToDisplay;

export default class SpecificTrainer extends React.Component {
        constructor(props)
    {
        super();
        this.state = {
            client: '',
             clientsToDisplay: [],
        }
                   
    }
async removeTrainer(){
    const { navigation } = this.props;
    const tInfo = navigation.getParam('selectedTrainer', 'NO-ID');
    try{
        const IDtoSend = JSON.stringify(tInfo.ID);
        console.log(IDtoSend);
        let response = await fetch ('http://ic-research.eastus.cloudapp.azure.com/~esteele/removeTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:IDtoSend
            });
        let rJSON = await response.json();
                 console.log(rJSON);
        if(rJSON["submitted"] === "true"){
            this.props.navigation.goBack();
        }
                  }catch(error){
            console.log(error);
        }
}
async componentDidMount(){
    console.log("display", clients);
    
    const { navigation } = this.props;
    const tInfo = navigation.getParam('selectedTrainer', 'NO-ID');
    
    try{
            var clients = [];
            var TID = tInfo.ID;
            const IDtoSend = JSON.stringify(TID);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getClientsForTrainer.php',{
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
                clients.push(rJSON[i])
            }
            for (let i =0; i<clients.length; i++){
                let a = this.state.clientsToDisplay.slice(); //creates the clone of the state
                a[i] = clients[i];
                this.setState({clientsToDisplay: a});
            }
            console.log("here",this.state.clientsToDisplay);
       
            
    }catch(error){
            console.log(error);
        }
}
    
    render(){
        const { navigation } = this.props;
        const trainer = navigation.getParam('selectedTrainer', 'NO-ID');
        
        const listItems = this.state.clientsToDisplay.map((client,index) => 
            <View style = {styles.containerRow} key={index}>                                              
            <Text style={styles.infoLabel}>Assigned Client {(index+1)+": "}{client.Firstname+" "+client.Lastname}</Text>
            </View>
            );

        return(
            
            <View style={styles.container}>
             
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
            {listItems}
            
        
            
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('EditInformation',{type:'trainer',trainerInfo: trainer})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Edit Information</Text></Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('assignClient',{type:'trainer',trainerInfo:trainer})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Assign a Client</Text></Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.removeTrainer()}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Remove Trainer</Text></Text>
            </View>
            </TouchableOpacity>

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
    //flex:2,
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    //width: 300,
    //height: 1000,
  },
  containerCol: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
      //padding: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width:300,
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    //marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, .30)',
    shadowOpacity: 0.9,
    //elevation: 6,
    shadowRadius: 3 ,
    shadowOffset : { width: 1, height: 7},
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