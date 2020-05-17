import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

    const User = t.struct({
      Netpass: t.String,
      Password: t.String,
      Email: t.String,
      Firstname: t.String,
      Lastname: t.String
    });

export default class TrainerAddition extends React.Component {
    constructor(props) {
        super(props);
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
                }
            }
        };

/*
Navigates to the confimation page while carrying over the form data.
*/
    _onClick(){
        const finfo = this._form.getValue();
        this.props.navigation.navigate('ConfirmationPage', {inNetpass: inNetpass});
    }
    
    render(){
        return(
            <ScrollView>
            <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
             
            <View style={{width: 180}}>
            <Form 
                    type={User} 
                    options = {this.options}
                    ref={c => this._form = c}
                />
            <TouchableOpacity onPress ={() => this._onClick()}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Add Trainer</Text>
            </View>
            </TouchableOpacity>

        </View>
        </View>
        </ScrollView>
        );
    }
}