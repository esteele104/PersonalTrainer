import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';



export default class ConfirmationPage extends React.Component {
    
     constructor(props) {
        super(props);
    };
    
    /*
    Adds a new row to the Trainers table using form data from the previous screen. Navigate to Admin Home page on success.
    */
     async _Submit(type,UserInfo){
         console.log(type);
         const lNetpass = UserInfo.Netpass.toLowerCase();
         const lEmail = UserInfo.Email.toLowerCase();
         UserInfo.Netpass = lNetpass;
         UserInfo.Email = lEmail;
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
                
                let rJSON = await response.json();
                 console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                    console.log("yes");  
                    this.props.navigation.navigate('AdminH');
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
                    this.props.navigation.navigate('AdminH');
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }                
 }
         
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
        
         <View>
            <Text style={styles.title}>Confirmation Page</Text>
             
            <View style={styles.container}>
                <Text style={styles.infoLabel}> Netpass Username: {UserInfo.Netpass}</Text>
            
            </View>
        
            <View style={styles.container}>
                <Text style={styles.infoLabel}> First Name: {UserInfo.Firstname}</Text>
          
            </View>
            
            <View style={styles.container}>
                <Text style={styles.infoLabel}> Last Name: {UserInfo.Lastname} </Text>
            </View>
        
        <View style={styles.container}>
                <Text style={styles.infoLabel}> Gender: {UserInfo.Gender} </Text>
           
            </View>
        
            <View style={styles.container}>
                <Text style={styles.infoLabel}> Email: {UserInfo.Email} </Text>
             </View>
            
            <View style={styles.container}>
                <Text style={styles.infoLabel}> Password: {UserInfo.Password}</Text>
            </View>
        
            
             {clientExtra}
        
            
            <View style={styles.containerCol}>
                    <TouchableOpacity
                        onPress={() => this._Submit(type,UserInfo)}>
                        <View style = {styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
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
    container: {
    //justifyContent: 'lef',
    marginBottom: 10,
    //padding: 50,
    width: 300,
    height: 50,
    alignSelf: 'auto'
    //backgroundColor: '#ffffff',
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
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 200,
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
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 10
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
    fontSize: 25,
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