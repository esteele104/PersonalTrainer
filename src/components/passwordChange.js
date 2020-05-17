import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

    const pass = t.struct({
      Password: t.String,
    });

const pass2 = t.struct({
      Password2: t.String,
    });

var userInfo = {
    Password: '',
    uType: '',
    ID: '',
}

export default class passwordChange extends React.Component {
    constructor(props)
    {
        super();
        
        this.state = { trainer: '',
          
        }
                    
    }
    options = {
        auto: 'placeholders',
            fields: {
                Password: {
                    label:"Enter your new password here",
                },
                Password2: {
                    label: "Enter your new password again"
                },
                
            }
    }
/*
Fetches user account of user selected on previous page
*/
async componentDidMount(){
        const { navigation } = this.props;
       const netpass = navigation.getParam('netpass', 'NO-ID');

         try{
             const toSendStr = JSON.stringify({uname: netpass});
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
             console.log("json",rJSON);
         }catch(error){
            console.log(error);
        }
    }

/*
Updates row and column in Trainers or Clients table for selected trainer or client.
*/
async _onClick(info){
   
        var trainer = this.state.trainer;
        
        if(userInfo.uType == "Trainers"){
            
            userInfo.Password = trainer.Password;
     
        }else{
            userInfo.Password = info.Password;
            
        }
        
    
        const finfo = this._form.getValue();
        const finfo2 = this._form2.getValue();
        if(finfo.Password == finfo2.Password2){
            userInfo.Password = finfo.Password;
            console.log(userInfo.ID, "and:", userInfo.Password)
            try{
             const toSendStr = JSON.stringify({userInfo: userInfo});
             console.log(toSendStr);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updatePassword.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSendStr
            });
            //console.log(response);
           let rJSON = await response.json();
             console.log(rJSON);
            if(userInfo.uType == 'Trainers'){
            this.props.navigation.navigate('TrainerH');
                }else{
                    this.props.navigation.navigate('ClientH');
                } 
         }catch(error){
            console.log(error);
        }
        }else if(userInfo.Password == finfo.Password){
        Alert.alert("Password must be different from your current password. ")}
        else{
            Alert.alert("Passwords do not match!")
        }
    }

    render(){
         const { navigation } = this.props;
         var info = navigation.getParam('info', 'NO-ID');
         var type = navigation.getParam('type', 'NO-ID');
        if(type == 'Clients'){
            userInfo.ID = parseInt(info.ID, 10);
            
        }else{
            var num= this.state.trainer.ID;
            userInfo.ID = num;
        }
        userInfo.uType = type;
        console.log("here1",userInfo);
        
        return(
            <View>
            <Form 
                    type={pass} 
                    options = {this.options}
                    ref={c => this._form = c}
                />
            <Form 
                    type={pass2} 
                    options = {this.options}
                    ref={c => this._form2 = c}
                />
             <TouchableOpacity onPress ={() => this._onClick(info)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
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