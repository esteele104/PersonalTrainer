import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';



export default class ConfirmationPage extends React.Component {
    
     constructor(props) {
        super(props);
    };
    
     async _Submit(type,UserInfo){
         console.log(type);
         const val = UserInfo;
         const toSend = UserInfo;
            const toSendStr = JSON.stringify(toSend);
            if(type == 'Trainer'){
                try{
                 console.log(toSendStr);
                let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/registerTrainer.php',{
                   method: 'POST',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                   },
                    body: toSendStr,
                });
                console.log(response);
                let rJSON = await response.json();
                 console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                    console.log("yes");   
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }   
            }
         else{
             try{
                 console.log(toSendStr);
                let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/registerClient.php',{
                   method: 'POST',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                   },
                    body: toSendStr,
                });
                console.log(response);
                let rJSON = await response.json();
                 console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                    console.log("yes");   
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }                
 }
         this.props.navigation.navigate('Start');
     }

     
    
    render() {
        const { navigation } = this.props;
        const UserInfo = navigation.getParam('UserInfo', 'NO-ID');
        const type = navigation.getParam('type', 'NO-ID');
        var clientExtra;
        if(type == 'Client'){
            clientExtra = 
                <View style={styles.containerRow}>
                
            
                    <Text style={styles.infoLabel}> Sessions Remaining: </Text>
                    
                    <Text style={styles.info}> {UserInfo.NumberOfSessions}  </Text>
                </View>
        }
    return (
         <View style={{alignItems: 'flex-start',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Netpass Username: </Text>
            
                <Text style={styles.info}> {UserInfo.Netpass} </Text>
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> First Name: </Text>
          
                <Text style={styles.info}> {UserInfo.Firstname} </Text>
            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Last Name: </Text>
           
                <Text style={styles.info}> {UserInfo.Lastname} </Text>
            </View>
        
        <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Gender: </Text>
           
                <Text style={styles.info}> {UserInfo.Gender} </Text>
            </View>
        
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Email: </Text>
            
                <Text style={styles.info}> {UserInfo.Email} </Text>
            </View>
            
            <View style={styles.containerRow}>
                <Text style={styles.infoLabel}> Password: </Text>
           
                <Text style={styles.info}> {UserInfo.Password} </Text>
            </View>
             {clientExtra}
        
                
                
            }
            
            <View style={styles.containerCol}>
                    <TouchableOpacity
                        onPress={() => this._Submit(type,UserInfo)}
                        style={styles.button}
                        disabled={false}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
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