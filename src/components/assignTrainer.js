import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

var trainers= [];
var selectedTrainer;



export default class assignTrainer extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            trainersToDisplay : [],
            selected: '',
            names: [],
        }
                   
    }
    /*
    Fetches all the trainers from the database and store them in an array.
    */
    async componentDidMount(){
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
                a[i] = trainers[i];
                this.setState({trainersToDisplay: a});
            }
            
    }catch(error){
            console.log(error);
        }
        for (let i =0; i<this.state.trainersToDisplay.length; i++){
            let a = this.state.names.slice();
            a[i] =this.state.trainersToDisplay[i].Firstname;
            this.setState({names: a});
            
        }
    }

    /*
Adds a new row in the data table, ClientsToTrainers with the ID of the selected client and ID of the selected Trainer. Trainer was selected on the previous screen. Navigates to the previous screen after update is done.
*/
async onClick(client){
    console.log("selected",client);
    for (let i =0; i<this.state.trainersToDisplay.length; i++){
        if(this.state.selected == this.state.trainersToDisplay[i].Firstname){
            selectedTrainer = this.state.trainersToDisplay[i];
        }
    }
    var toSend = {
        TID : selectedTrainer.ID,
        CID : client.ID   
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
        const client = navigation.getParam('clientInfo', 'NO-ID');
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
<TouchableOpacity onPress ={() => this.onClick(client) }>
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