import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var clients= [];
var selectedClient;



export default class assignClient extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            clientsToDisplay : [],
            selected: '',
            names: [],
        }
                   
    }
    async componentDidMount(){
        try{
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
            
    }catch(error){
            console.log(error);
        }
        for (let i =0; i<this.state.clientsToDisplay.length; i++){
            let a = this.state.names.slice();
            a[i] =this.state.clientsToDisplay[i].Firstname+" "+this.state.clientsToDisplay[i].Lastname;
            this.setState({names: a});
            
        }
    }

async onClick(trainer){
    console.log("selected",trainer);
    for (let i =0; i<this.state.clientsToDisplay.length; i++){
        if(this.state.selected == (this.state.clientsToDisplay[i].Firstname+" "+this.state.clientsToDisplay[i].Lasrname)){
            selectedClient = this.state.clientsToDisplay[i];
        }
    }
    var toSend = {
        TID : trainer.ID,
        CID : selectedClient.ID   
    }
    const toSendStr = JSON.stringify(toSend);
    console.log("toSend",toSendStr);
    try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/assignTrainer.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                 body: toSendStr,
            });
            //console.log(response);
            let rJSON = await response.json();
            console.log(rJSON);
            this.props.navigation.goBack();
}  catch(error){
                console.log(error);
            }
}
 
    render()
    {
        const { navigation } = this.props;
        const trainer = navigation.getParam('trainerInfo', 'NO-ID');
        return(
        <View> 
            <Picker
  selectedValue={this.state.selected}
  style={styles.container}
  onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
   {this.state.names.map((item, index) => {
        return (< Picker.Item label={item} value={item} key={index} />);
})}
</Picker>
<TouchableOpacity onPress ={() => this.onClick(trainer) }>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Assign</Text></Text>
            </View>
            </TouchableOpacity>
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