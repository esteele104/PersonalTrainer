import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


var trainerToDisplay;

export default class SpecificSess extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainer: '',
        }
                   
    }
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
                    this.props.navigation.navigate('ClientH');
                    console.log("yes"); 
        
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }

    
    render(){
        const { navigation } = this.props;
        const session = navigation.getParam('selectedSess', 'NO-ID');
        var listOfSessions = [];
        listOfSessions = navigation.getParam('SessionsToSend', 'NO-ID');
        var type = navigation.getParam('type', 'NO-ID');
        var clientInfo = {
            firstname: session.ClientFirstName,
            lastname: session.ClientLastName
        };
        var buttonText;
        if(type == 'trainer'){
            buttonText = 'Email Client';
        }else{
            buttonText = 'Email Trainer';
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
                <Text style={styles.infoLabel}> Assigned To: {session.AssignedTo}</Text>
            
            </View>
            <View >
                <Text style={styles.infoLabel}> Trainer Email: {this.state.trainer.Email}</Text>
            </View>
            
            <View >
                <Text style={styles.infoLabel}> Date & Time: {session.Date}</Text>
            </View>
            
            <View style ={{flexDirection: 'row'}}>
            <TouchableOpacity onPress ={() => this.props.navigation.navigate('emailTrainer',{trainer: this.state.trainer,clinet:clientInfo})}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{buttonText}</Text></Text>
            </View>
             </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.cancelSess(session)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Cancel Session</Text></Text>
            </View>
             </TouchableOpacity>
        
            </View>
            
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
  button: {
    backgroundColor: '#003b71',
    width: 130,
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
