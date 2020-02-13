import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


export default class completedSessions extends React.Component {
    static navigationOptions = {
    title: "Completed Sessions",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
    }
        constructor(props)
    {
        super();
        
        this.state = {
             sessions : [],
             
        }
        
    }
    
    async componentDidMount() {
    try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getCompletedSessions.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
           let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                let a = this.state.sessions.slice(); //creates the clone of the state
                a[i] = rJSON[i];
                this.setState({sessions: a});
            }
       
        
            
    }catch(error){
            console.log(error);
        }
    }
    
    render(){
        const { navigation } = this.props;
        var clients = navigation.getParam('clients', 'NO-ID');
         
         const listItems = this.state.sessions.map((session,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificSessC',{selectedSess: session,sessionsToSend: this.state.sessions,type:'Admin',clients: clients})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{session.ClientFirstname} {session.ClientLastname}-{session.Date}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
            <View>
            <ScrollView style={styles.container}>
            {listItems}
            </ScrollView>
            
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    paddingTop: 15,
    //padding: 50,
    width: 400,
    height: 1000,
    alignSelf: 'center'
    //backgroundColor: '#ffffff',
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
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, .30)',
    shadowOpacity: 0.9,
    //elevation: 6,
    shadowRadius: 3 ,
    shadowOffset : { width: 1, height: 7},
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