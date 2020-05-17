import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Header } from 'react-native-elements';

var clients= [];
var toDisplay = [];
var input = '';





export default class ViewClients extends React.Component {
    static navigationOptions = {
    title: "Clients",
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
            type: '',
            clientsToDisplay: [],
            trainersToDisplay: [],
            sessions: [],
        }
                   
    }

/*
Fetches all the data from the Clients table matching the val parameter.
*/
async _search(val){
    try{
        var info = {id: '',
                str:val
               }
        var toSend = JSON.stringify(info);
        var clients2 = [];
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/filterClients.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSend
            });
            //console.log("resp",response);
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                clients2.push(rJSON[i])
            } 
            this.setState({clientsToDisplay: []});
            
            for (let i =0; i<clients2.length; i++){
                let a = this.state.clientsToDisplay.slice(); //creates the clone of the state
                a[i] = clients2[i];
                this.setState({clientsToDisplay: a});
            }
            console.log("clients",this.state.clientsToDisplay);
    }catch(error){
            console.log(error);
        
}
}
/*
Fetches all the data from the Clients table and stores them in an array.
*/
    async componentDidMount() {
        try{
            clients = [];
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getClients.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                clients.push(rJSON[i])
            }
            for (let i =0; i<clients.length; i++){
                let a = this.state.clientsToDisplay.slice(); //creates the clone of the state
                a[i] = clients[i];
                this.setState({clientsToDisplay: a});
            }
            console.log(this.state.clientsToDisplay);
    }catch(error){
            console.log(error);
        }
    }
    
    
 
    render()
    {
         const { navigation } = this.props;
        var clients = [];
        var sessions = [];
        clients = this.state.clientsToDisplay;
        sessions = navigation.getParam('sessions','NO-ID');
        const listItems = clients.map((client,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificClient',{selectedClient: client, clients: clients, sessions:sessions, type:'admin'})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{client.Firstname+" "+client.Lastname}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
        
            <View style >
            <Input
                  containerStyle = {styles.viewHolder}
                  placeholder='Search client name or netpass'
                  onChangeText={(text) => this.setState({text}, () => this._search(this.state.text))}
                  value={this.state.text}
                  leftIcon={
                    <Icon
                      name='search'
                      size={30}
                      color='grey'
                    />
                  }
                />
            
            <ScrollView style={styles.container}>
            
            {listItems}
            </ScrollView>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
  container: {
          marginTop: 20,
    width: 300,
    height: 1000,
    alignSelf: 'center'
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
    backgroundColor: '#003b71',
    borderColor: '#003b71',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        //margin: 4
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