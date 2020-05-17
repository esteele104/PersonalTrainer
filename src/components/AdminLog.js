import React from 'react';
import { View, Text, Image, Button, Alert, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

    const User = t.struct({
      Netpass: t.String,
      Password: t.String,
    });

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 50;
stylesheet.textbox.normal.fontSize = 25;
stylesheet.controlLabel.normal.fontSize = 20;
stylesheet.textbox.error.height = 50;
stylesheet.textbox.error.fontSize = 25;
stylesheet.controlLabel.error.fontSize = 20;

export default class AdminLogin extends React.Component {
    static navigationOptions = {
    title: "Login Screen",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
    }
         constructor(props) {
        super(props);
             this.state = {
                 type: ''
             }
         }

    
    options = {
            stylesheet: stylesheet,
            auto: 'placeholders',
            fields: {
                Netpass: {
                    label: 'Netpass Username', // <= label for the name field
                    onSubmitEditing: () => this._form.getComponent('Password').refs.input.focus(),
                },
                Password: {
                    label: 'Password',
                    secureTextEntry: true,
                    onSubmitEditing: () => this._onClick()
                }
            }
        }
/*
Uses form values to first check if a user account exists then if password and username match what is in the database. Navigates to appropriate page (admin, trainer, or client) if login was successful. Display an alert if login wa sunsuccessful. Uses a different PhP file based on Ltpe. Ltype was captured on landing page. 
*/

    async _onClick(Ltype){
        console.log(Ltype);
        if(Ltype == 'Admin'){
        try{
            const finfo = this._form.getValue();
            if(finfo == null){
                Alert.alert("One or more fields are blank!")
            }
            const uname = finfo.Netpass;
            const toSendStr1 = JSON.stringify({uname: uname});
            const toSendStr = toSendStr1.toLowerCase();
            console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/AdminLogin.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr,
            });
            //console.log(response);
            let rJSON = await response.json();
            console.log(rJSON["pass"]);
            if(rJSON["pass"]!=="false"){
                //here
                const toSave = {
                    userName: uname,
                    password: rJSON["pass"],
                };
                const inNetpass = finfo.Netpass;
                const toSaveStr = JSON.stringify(toSave);
                console.log(finfo.Password);
                if(finfo.Password===toSave.password){
                    this.props.navigation.navigate('AdminH', {inNetpass: inNetpass});
                }
                else{
                   Alert.alert("Password Incorrect!"); 
                }
            }
            else{
                Alert.alert("Account Does not exist!!");
            }
        } catch(error){
            console.log(error);
        } 
                        
    }else if (Ltype == 'Trainer'){
        try{
            const finfo = this._form.getValue();
            if(finfo == null){
                Alert.alert("One or more fields are blank!")
            }
            const uname = finfo.Netpass;
            const toSendStr1 = JSON.stringify({uname: uname});
            const toSendStr = toSendStr1.toLowerCase();
            console.log(toSendStr);
            console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/TrainerLogin.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr,
            });
            //console.log(response);
            let rJSON = await response.json();
            console.log(rJSON["pass"]);
            if(rJSON["pass"]!=="false"){
                //here
                const toSave = {
                    userName: uname,
                    password: rJSON["pass"],
                };
                const inNetpass = finfo.Netpass;
                const toSaveStr = JSON.stringify(toSave);
                console.log(finfo.Password);
                if(finfo.Password===toSave.password){
                    this.props.navigation.navigate('TrainerH', {inNetpass: inNetpass});
                }
                else{
                   Alert.alert("Password Incorrect!"); 
                }
            }
            else{
                Alert.alert("Account Does not exist!!");
            }
        } catch(error){
            console.log(error);
        } 
                        
    }else if (Ltype == 'Client'){
        try{
            const finfo = this._form.getValue();
            if(finfo == null){
                Alert.alert("One or more fields are blank!")
            }
            const uname = finfo.Netpass;
            const toSendStr1 = JSON.stringify({uname: uname});
            //const toSendStr = toSendStr1.toLowerCase();
           // console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/ClientLogin.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr1,
            });
            //console.log(response);
            let rJSON = await response.json();
            console.log(rJSON["pass"]);
            if(rJSON["pass"]!=="false"){
                //here
                const toSave = {
                    userName: uname,
                    password: rJSON["pass"],
                };
                const inNetpass = finfo.Netpass;
                const toSaveStr = JSON.stringify(toSave);
                if(finfo.Password===toSave.password){
                    this.props.navigation.navigate('ClientH', {inNetpass: inNetpass});
                }
                else{
                   Alert.alert("Password Incorrect!"); 
                }
            }
            else{
                Alert.alert("Account Does not exist!!");
            }
        } catch(error){
            console.log(error);
        } 
                        
    }
    } 
    
    render() {
    const { navigation } = this.props;
    const Ltype = navigation.getParam('LogType', 'NO-ID');

    return (
        <View style={{alignItems: 'center',paddingTop: 150, backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 300}}>
            <Form 
                    type={User} 
                    options = {this.options}
                    ref={c => this._form = c}
                    
                />
            </View>
            <TouchableOpacity onPress ={() => this._onClick(Ltype)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress ={() => this.props.navigation.navigate('ForgotPassword')}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Forgot Password</Text>
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
    height: 50,
    width: 300,
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    //borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    //alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, .30)',
    shadowOpacity: 0.9,
    //elevation: 6,
    shadowRadius: 3 ,
    shadowOffset : { width: 1, height: 7},
  }
});