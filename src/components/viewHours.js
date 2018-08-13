import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import email from 'react-native-email';


export default class viewHours extends React.Component {
    constructor(props)
    {
        super();
        
        this.state = {
          
        }
                    
    }

    render(){
         const { navigation } = this.props;
       
        var myHours = navigation.getParam('hours', 'NO-ID');
        return(
            <View>
            <Text> Total Hours: {myHours} </Text>
            </View>
        );
    }
}