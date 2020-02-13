import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';



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
      Availability: t.maybe(t.String),
      
      
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
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 50;
stylesheet.textbox.normal.fontSize = 25;
stylesheet.controlLabel.normal.fontSize = 20;
stylesheet.textbox.error.height = 50;
stylesheet.textbox.error.fontSize = 25;
stylesheet.controlLabel.error.fontSize = 20;

export default class TrainerAddition extends React.Component {
    static navigationOptions = {
    title: "Client Addition",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
    }
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
            stylesheet: stylesheet,

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
                Availability: {
                    label: 'Availability',
            }
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
            <View style={{alignItems: 'center',justifyContent: 'center',  }}>
             
            <View style={{width: 300}}>
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