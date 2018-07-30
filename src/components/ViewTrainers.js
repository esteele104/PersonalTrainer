import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var trainers= [];
var toDisplay = [];
var input = '';





export default class ViewTrainers extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainersToDisplay : [],
        }
                   
    }
    
    async componentDidMount() {
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                trainers.push(rJSON[i])
            }
            for (let i =0; i<trainers.length; i++){
                let a = this.state.trainersToDisplay.slice(); //creates the clone of the state
                a[i] = trainers[i].Netpass;
                this.setState({trainersToDisplay: a});
            }
            console.log(this.state.trainersToDisplay);
    }catch(error){
            console.log(error);
        }
    }
    _onClick(trainer){
        console.log(trainer)
    }
 
    render()
    {
         
        const listItems = this.state.trainersToDisplay.map((trainer,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificTrainer',{selectedTrainer: trainer,trainersToSend: trainers})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{trainer}</Text></Text>
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