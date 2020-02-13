import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

var PType = t.enums({
  Individual: 'Individual',
  Partner: 'Partner',
  MBM: 'Mind, Body, Me',
});

const session = t.struct({
      ClientFirstName: t.String,
      ClientLastName: t.String,
      AssignedTo: t.String,
      ClientEmail: t.String,
      Date: t.maybe(t.Date),
      SessionType: PType,
      
      
     
});

var infoToSend = {
    Workout: '',
    ClientFirstName: '',
      ClientLastName: '',
      AssignedTo: '',
      ClientEmail: '',
      Date: '',
      SessionType: '',
      SessionID: '',
}


 var options = {
            auto: 'placeholders',
            fields: {
                
                ClientFirstName: {
                    label: 'First Name',
                },
                ClientLastName: {
                    label: 'Last Name',
                },
                ClientEmail: {
                    label: 'Email',
                },
                Date: {
                    label: 'Session Date & Time',
                },
                SessionType: {
                    label: 'Session Type',
                },
                AssignedTo: {
                    label: 'Assigned to',
                },
                Workout: {
                    label: 'Workout for the day',
                },
            }
        };

export default class EditSession extends React.Component {
        constructor(props)
    {
        super();
            this.state = { workout: ''}
            
        }
                
   

async _onClick(value){
    const finfo = this._form.getValue();
    if(finfo){
        try{
        infoToSend.AssignedTo = finfo.AssignedTo,
        infoToSend.ClientEmail = finfo.ClientEmail,
        infoToSend.ClientFirstName = finfo.ClientFirstName,
        infoToSend.ClientLastName = finfo.ClientLastName,
        infoToSend.Date = finfo.Date,
        infoToSend.SessionID = value,
        infoToSend.SessionType = finfo.SessionType,
        infoToSend.Workout = this.state.workout;
            
        const toSendStr = JSON.stringify({sessionInfo:infoToSend}); 
        console.log(toSendStr);
        let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateSessionInfo.php',{
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
            this.props.navigation.goBack();
          } else{
                Alert.alert(rJSON["message"]);
            }
     }  catch(error){
                console.log(error);
            }
        }
}
   
    
    render(){
         const { navigation } = this.props;
        var Info = navigation.getParam('sessionInfo', 'NO-ID');
        console.log("this",Info);
        infoToSend.Workout= Info.Workout;
        var value = {
    
              ClientFirstName: Info.ClientFirstName,
              ClientLastName: Info.ClientLastName,
                SessionID: Info.ID,
                AssignedTo: Info.AssignedTo,
                SessionType: Info.SessionType,
                ClientEmail: Info.ClientEmail,
            }
        
        return(
            <View>
            <Text style={styles.text}> Workout </Text>
            <TextInput
                multiline = {true}
                style={{height: 80, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({workout:text})}
               value={this.state.workout}
              />
            <Form 
                    type={session} 
                    options={options}
                    value={value}
                    ref={c => this._form = c}
                />
                
            <TouchableOpacity onPress ={() => this._onClick(Info.ID)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Update Info</Text></Text>
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
  },
 
    viewHolder:
    {
        height: 55,
        backgroundColor: '#26A69A',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
 
    text:
    {
        color: 'black',
        fontSize: 20
    },
 
    btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },
 
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    },input: {
      margin: 15,
      height: 80,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
});