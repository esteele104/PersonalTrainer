import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

export default class ViewTrainers extends React.Component {
        constructor(props)
    {
        super();
        
    }
    
    render(){
        const { navigation } = this.props;
        var mySessions = [] ;
        mySessions = navigation.getParam('sess', 'NO-ID');
        console.log(mySessions);
        
        const listItems = mySessions.map((session,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificSess',{selectedSess: session,sessionsToSend: mySessions})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{session.Date}</Text></Text>
            </View>
            </TouchableOpacity>
                );

        
        return(
        <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
        
            {listItems}
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