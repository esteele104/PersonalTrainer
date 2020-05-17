import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Header } from 'react-native-elements';

var myClients= [];

export default class ViewMyClients extends React.Component {
    static navigationOptions = {
    title: "My Clients",
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
            clientsToDisplay : [],
        }
                   
    }
async _search(val){
    const { navigation } = this.props;
            const myInfo = navigation.getParam('myInfo', 'NO-ID');
    var info = {id: myInfo.ID,
                str:val
               }
    try{
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
    async componentDidMount(){
        try{
            var clients = [];
            const { navigation } = this.props;
            const myInfo = navigation.getParam('myInfo', 'NO-ID');
            var ID = myInfo.ID;
            const IDtoSend = JSON.stringify(ID);
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getClientsForTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:IDtoSend
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
            
            
    }catch(error){
            console.log(error);
        }

    }
    
    
 
    render()
    {
         const { navigation } = this.props;
       
        
        const listItems = this.state.clientsToDisplay.map((client,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificClient',{selectedClient: client})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{client.Firstname+" "+client.Lastname}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
        
            <View>
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
    //justifyContent: 'center',
    marginTop: 20,
    //padding: 50,
    width: 300,
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