import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


export default class ViewMyClients extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainersToDisplay : [],
        }
                   
    }
    
 
    render()
    {
         const { navigation } = this.props;
        var myClients = [];
        myClients = navigation.getParam('myClients', 'NO-ID');
        
        const listItems = myClients.map((client,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificClient',{selectedClient: client})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{client.Firstname +" "+client.Lastname}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
        
            <View style = { styles.container }>
            <ScrollView>
            {listItems}
            </ScrollView>
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