import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import email from 'react-native-email';



var trainerToDisplay;
var toSend;

export default class SpecificSess extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainer: '',
        }
                   
    }
    /*
    Fetches all the trainer data associated with the seleted sesison.
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
    
    async cancelSess(session){
        
        const { navigation } = this.props;
         var clients = [];
         var currClient;
         clients = navigation.getParam('clients', 'NO-ID');
         console.log("client here:",clients);
         console.log("session here:",session);
         for(let i = 0; i<clients.length; i++){
             if(clients[i].Firstname == session.ClientFirstName && clients[i].Lastname == session.ClientLastName){
                 currClient = clients[i];
             }
         }
        console.log("client now:",currClient);
        try{
             const toSendStr = JSON.stringify({ID: session.ID});
             console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/deleteSession.php',{
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
    
    var num;
    var temp;
    if(session.SessionType == currClient.PackageType){
        //incriment sessions remaining
        num = currClient.SessionsRemaining;
         num = parseInt(num, 10);
        console.log("old",num);
        num++;
        console.log("new",num);
        temp = {
                     sType: session.SessionType,
                      sessionsLeft: num,
                      netpass: currClient.Netpass,
                };
        
    }else{
        //incriment additional sessions remaining
        num = currClient.AdditionalSessions;
        
         num = parseInt(num, 10);
       console.log("hold",currClient.AdditionalSessions);
        num++;
        console.log("new",num);
        temp = {
                     sType: session.SessionType,
                      sessionsLeft: num,
                      netpass: currClient.Netpass,
                };
    }
        const toSendStr = JSON.stringify(temp);
        let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateSessionsLeft.php',{
                   method: 'POST',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                   },
                    body: toSendStr,
                });
                
                let rJSON = await response.json();
                 console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                       var to = currClient.Email;
                        var to2 = this.state.trainer.Email;
                        var body = "Your session for "+session.Date+" has been canceled";
            
                        email(to, to2,{
                        // Optional additional arguments

                        subject: "Session Canceled",
                        body: body
                    }).catch(console.error);
                    this.props.navigation.goBack();
                    console.log("yes"); 
        
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }
handleEdit(type,session){
        if(type == 'client'){
            Alert.alert("Contact a trainer if you would like to change session information");
        }
        else {
            this.props.navigation.navigate('EditSess', {sessionInfo: session});
        }
    }
async complete(session){
   
        try{
             const toSendStr = JSON.stringify(session);
             console.log("here",toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/addCompletedSession.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr
            });
            //console.log(response);
           let rJSON = await response.json();
            console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                    console.log("yes"); 
                    try{
             const toSendStr2 = JSON.stringify({ID: session.ID});
             console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/deleteSession.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr2
            });
            //console.log(response);
           let rJSON = await response.json();
             console.log(rJSON);
            this.props.navigation.navigate('TrainerH');
         }catch(error){
            console.log(error);
        }  
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
                        
         }catch(error){
            console.log(error);
        }
    
}
        

    
    
                                           
    render(){
        const { navigation } = this.props;
        const session = navigation.getParam('selectedSess', 'NO-ID');
        console.log("session",String(session.Date).split('T'));
        var listOfSessions = [];
        var date = String(session.Date).split('T');
        var time = String(date[1]).split('.');
        time = time[0];
        time = time.split(':');
        time = time[0]+':'+time[1];
        date = date[0];
        listOfSessions = navigation.getParam('SessionsToSend', 'NO-ID');
        var type = navigation.getParam('type', 'NO-ID');
        var clientInfo = {
            firstname: session.ClientFirstName,
            lastname: session.ClientLastName,
            email: session.ClientEmail,
        };
        var buttonText;
        var button = <Text>
            
            </Text>
        if(type == 'trainer'){
            buttonText = 'Email Client';
            button = <View style ={{flexDirection: 'row'}}>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('emailTrainer',{trainer: this.state.trainer,client:clientInfo,type: type})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{buttonText}</Text></Text>
            </View>
             </TouchableOpacity>
            </View>
        }else if(type == 'Client'){
            buttonText = 'Email Trainer';
            button = <View style ={{flexDirection: 'row'}}>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('emailTrainer',{trainer: this.state.trainer,client:clientInfo,type: type})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{buttonText}</Text></Text>
            </View>
             </TouchableOpacity>
            </View>
        }
        
        return(
             <View style={{alignItems: 'flex-start',justifyContent: 'center', backgroundColor: 'white'}}>
            
            <View>
                <Text style={styles.infoLabel}> Client Firstname: {session.ClientFirstName}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Client Lastname: {session.ClientLastName}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Client Email: {session.ClientEmail}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Assigned To: {session.AssignedTo}</Text>
            
            </View>
            <View >
                <Text style={styles.infoLabel}> Trainer Email: {this.state.trainer.Email}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Date: {date}</Text>
            </View>
            <View >
                <Text style={styles.infoLabel}> Time: {time}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Workout: {session.Workout}</Text>
            </View>
            
            {button}
            <TouchableOpacity onPress ={() => this.complete(session)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Mark as Complete</Text></Text>
            </View>
             </TouchableOpacity>
            
            <TouchableOpacity onPress ={() => Alert.alert(
    'Cancel Session',
    'Are you sure you want to cancel this session?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      {text: 'OK', onPress: () => {this.cancelSess(session)}},

    ])}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Cancel Session</Text></Text>
            </View>
             </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.handleEdit(type,session)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Edit Session</Text></Text>
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
