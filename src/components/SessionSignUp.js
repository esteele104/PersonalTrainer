import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, DatePickerIOS, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

const User = t.struct({
      Date: t.String,
      Firstname: t.String,
      Lastname: t.String,
      
    });

export default class TrainerLogin extends React.Component {
    constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }
    
     render() {
        const { navigation } = this.props;
        const client = navigation.getParam('client', 'NO-ID');
         return(
            <View style={styles.containerRow}>
                 <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
            mode="datetime"
             
             />
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