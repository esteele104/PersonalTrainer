import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';



export default class SpecificClient extends React.Component {
        constructor(props)
    {
        super();
        
         this.state = {
            trainer: '',
             trainersToDisplay: [],
             title:"test",
        }
                   
    }

    static navigationOptions = {
    title: "Client Name Here",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
    }
async componentDidMount(){
    console.log("display", trainers);
    
    const { navigation } = this.props;
    const cInfo = navigation.getParam('selectedClient', 'NO-ID');
    title = cInfo.ID;
    
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
            <View style = {{alignItems: 'left'}}key={index}>                                              
            <Text style={styles.infoLabel}>Assigned Trainer {(index+1)+": "}{trainer.Firstname+" "+trainer.Lastname}</Text>
            </View>
           
                );
        var admin = <Text>
            
            </Text>

        if(type == 'admin'){
            admin = <View style={{alignItems: 'center', paddingTop: 20, justifyContent: 'center' }}>
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

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('SessionsView',{sess: sessions,clients:clients})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>View Client's Sessions</Text>
            </View>
            </TouchableOpacity>
            </View>

        }
        
        
        return(
            
            <View >
             
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
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Availability: {client.Availability} </Text>
            </View>
            
           {listItems}
        
            {admin}

        
            
            
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
    alignItems: 'flex-start',
    //justifyContent: 'left',
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 60,
    width: 280,
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'stretch',
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