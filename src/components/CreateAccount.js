import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Form = t.form.Form;

var Gender = t.enums({
  Male: 'Male',
  Female: 'Female'
});

var PType = t.enums({
  Individual: 'Individual',
  Partner: 'Partner',
  MBM: 'Mind, Body, Me'
});

var affiliation = t.enums({
  Faculty: 'Faculty',
  Staff: 'Staff',
  Student: 'Student'
});

var numSessions = t.enums({
  4: '4',
  7: '7',
  10: '10',
});

    const User = t.struct({
      Netpass: t.String,
      Password: t.String,
      Email: t.String,
      Firstname: t.String,
      Lastname: t.String,
      Gender: Gender,
      SchoolAffiliation: affiliation, 
      PackageType: PType,
      NumberOfSessions: numSessions,
      
      
    });
var UserInfo = {
                Netpass: '',
                Password: '',
                Email: '',
                Firstname: '',
                Lastname: '',
                Gender: '',
                SchoolAffiliation: '', 
                SessionsRemaining: '',
                PackageType: '',
                NumberOfSessions: '',
                
                  
            }
export default class TrainerAddition extends React.Component {
    constructor(props) {
        super(props);
        /*this.state={
            UserInfo : {
                Netpass: '',
                Password: '',
                Email: '',
                Firstname: '',
                Lastname: ''
                  
            }
        }
        */
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
                },
                Firstname: {
                    label: 'First Name',
                },
                Lastname: {
                    label: 'Last Name',
                },
                Email: {
                    label: 'Email',
                },
                SchoolAffiliation: {
                    label: 'School Affiliation',
                },
                PackageType: {
                    label: 'Package Type',
                },
                Gender: {
                    label: 'Gender',
                },
                NumberOfSessions: {
                    label: 'Number of Sessions',
                },
            }
        };

    _onClick(type){
        const finfo = this._form.getValue();
        if(finfo){
        
            UserInfo = {
                Netpass:finfo.Netpass,
                Password: finfo.Password,
                Email: finfo.Email,
                Firstname: finfo.Firstname,
                Lastname: finfo.Lastname,
                Gender: finfo.Gender,
                SchoolAffiliation: finfo.SchoolAffiliation, 
                PackageType: finfo.PackageType,
                NumberOfSessions: finfo.NumberOfSessions,
                
            } 
        
        this.props.navigation.navigate('ConfirmationPage', {UserInfo: UserInfo, type:type});
    }
    }
    
    render(){
        const { navigation } = this.props;
        const type = navigation.getParam('type', 'NO-ID');
        return(
            <ScrollView>
            <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
            <Form 
                    type={User} 
                    options = {this.options}
                    ref={c => this._form = c}
                />
            <TouchableOpacity onPress ={() => this._onClick(type)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
            </View>
            </TouchableOpacity>

        </View>
        </View>
</ScrollView>
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