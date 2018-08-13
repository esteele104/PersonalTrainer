import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import email from 'react-native-email';

var trainer;

export default class emailTrainer extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            subject: '',
            body: '',
            
        }
                   
    }
    _onSend(trainer){
        const to = trainer.Email; // string or array of email addresses
        email(to, {
            // Optional additional arguments
            
            subject: this.state.subject,
            body: this.state.body
        }).catch(console.error)
    }
    
 
    render()
    {
        const { navigation } = this.props;
        const trainer = navigation.getParam('trainer', 'NO-ID');
        return(
         <View style = {styles.container}>
            <TextInput style = {styles.input2}
              multiline = {true}
               underlineColorAndroid = "transparent"
               placeholder = "Subject"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
                onChangeText = {(subject) => this.setState({subject})}
            
               />
            
            <TextInput style = {styles.input}
              multiline = {true}
               underlineColorAndroid = "transparent"
               placeholder = "Type message here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
            onChangeText = {(body) => this.setState({body})}
               />
            
            <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress ={()=>this._onSend(trainer)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Send Email</Text></Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        );
    }
}
   handleEmail = () => {
       console.log(this.state.subject,this.state.body, trainer.Email);
        const to = trainer.Email; // string or array of email addresses
        email(to, {
            // Optional additional arguments
            
            subject: this.state.subject,
            body: this.state.body
        }).catch(console.error)
    }
  
    const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    //flex: 1
  },
     input: {
      margin: 15,
      height: 80,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
        input2: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
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
        color: 'white',
        fontSize: 25
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
    }
});