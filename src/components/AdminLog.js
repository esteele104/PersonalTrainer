import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

    const User = t.struct({
      Netpass: t.String,
      Password: t.String,
    });



export default class AdminLogin extends React.Component {
    
         constructor(props) {
        super(props);
             this.state = {
                 type: ''
             }
         }
    
    options = {
            auto: 'placeholders',
            fields: {
                Netpass: {
                    label: 'Netpass Username', // <= label for the name field
                    onSubmitEditing: () => this._form.getComponent('Password').refs.input.focus()
                },
                Password: {
                    label: 'Password',
                    secureTextEntry: true,
                    onSubmitEditing: () => this._onClick()
                }
            }
        }
    

    async _onClick(Ltype){
        console.log(Ltype);
        if(Ltype == 'Admin'){
        try{
            const finfo = this._form.getValue();
            const uname = finfo.Netpass;
            const toSendStr = JSON.stringify({uname: uname});
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
            const uname = finfo.Netpass;
            const toSendStr = JSON.stringify({uname: uname});
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
            const uname = finfo.Netpass;
            const toSendStr = JSON.stringify({uname: uname});
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/ClientLogin.php',{
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
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
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
    height: 36,
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});