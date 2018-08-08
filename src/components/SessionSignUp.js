import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, DatePickerIOS, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

const time = t.struct({
    Date: t.Date,
    StartTime: t.Date,
});

var options = {
  fields: {
      Date : {
          mode: 'datetime'
          
      },
    StartTime: {
      mode: 'time',      
    },
  }
};


var info = {
    Clientfirstname: '',
    Clientlastname: '',
    DateTime: '',
    assignedTo: '',
    
};

var clients = [];
var client = '';

export default class TrainerLogin extends React.Component {
    constructor(props) {
    super(props);
    this.state = { text: '' ,clientLastname : '', clientFirstname: '', AssignedTo: '', trainer: '', trainers : [], availTrainers: [], sessions: [],  clientsToDisplay: [], selectedClient: null};

    }
    
    async componentDidMount(){
        
        
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getSessions.php',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
           
            let rJSON = await response.json();
            for (let i =0; i<rJSON.length; i++){
                let a = this.state.sessions.slice(); //creates the clone of the state
                a[i] = rJSON[i];
                this.setState({sessions: a});
            }
    }
        catch(error){
            console.log(error);
        }
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
            console.log("here",this.state.clientsToDisplay);
       
            
    }catch(error){
            console.log(error);
        }
    }
            

    async _onClick(netpass){
        
        if(this.state.selectedClient != null){
                for(let i =0; i<this.state.clientsToDisplay.length; i++){
                    if(this.state.clientsToDisplay[i].Netpass == this.state.selectedClient){
                        client = this.state.clientsToDisplay[i];
                    }
                }
            };
        console.log("client",client);
;        const finfo = this._form.getValue();
        if(finfo){
            
            info.Clientfirstname = client.Firstname;
            info.Clientlastname = client.Lastname;
            info.DateTime = finfo.Date;
            info.assignedTo = netpass;
            
            const toSendStr = JSON.stringify(info);
            
            try{
                 
                let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/addSession.php',{
                   method: 'POST',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                   },
                    body: toSendStr,
                });
                
                let rJSON = await response.json();
                 console.log(rJSON["submitted"]);
                  if(rJSON["submitted"]==="true"){
                    console.log("yes"); 
                      this.props.navigation.navigate('TrainerH');
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }
            
        
                 }
    }

loadClients() {
  return this.state.clientsToDisplay.map((client,index) => (
     <Picker.Item label={client.Firstname} value={client.Netpass} key={index} />
  ))
}
    
     render() {
        
                
        const { navigation } = this.props;
        const netpass = navigation.getParam('inNetpass', 'NO-ID');

         return(
            <View style={styles.containerRow}>
             <Picker
                selectedValue={this.state.selectedClient}
                onValueChange={(itemValue, itemIndex) => 
                this.setState({selectedClient: itemValue})}>
                {this.loadClients()}
            </Picker>
             
             <Form 
                    type={time} 
                    options = {options}
                    ref={c => this._form = c}
                    
                />
             
             <TouchableOpacity onPress ={() => this._onClick(netpass)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
  }
});