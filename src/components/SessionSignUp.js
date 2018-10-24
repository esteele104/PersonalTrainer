import React from 'react';
import { Icon,View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, DatePickerIOS, AsyncStorage, NetInfo } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;
var PType = t.enums({
  Individual: 'Individual',
  Partner: 'Partner'
});
const time = t.struct({
    Date: t.Date,
    SessionType: PType, 
});



var options = {
  fields: {
      Date : {
          mode: 'datetime'
          
      },
  }
};


var info = {
    Clientfirstname: '',
    Clientlastname: '',
    DateTime: '',
    assignedTo: '',
    SessionType: '',
    clientEmail:'',
    
};


var client = '';

export default class SessionSignUp extends React.Component {
    constructor(props) {
    super(props);
    this.state = { text: '' ,clientLastname : '', clientFirstname: '', AssignedTo: '', trainer: '', trainers : [], availTrainers: [], sessions: [],  clientsToDisplay: [], selectedClient: null, sType:'Individual', 
                  };

    }
    
    async componentDidMount(){
        
        
        try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getAllSession.php',{
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
            console.log("sess");
            console.log(error);
        }
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
            console.log("here",clients, IDtoSend);
            
    }catch(error){
            console.log(error);
        }

    }
        
            
    async _onClick(myInfo){
        
        if(this.state.selectedClient != null){
                for(let i =0; i<this.state.clientsToDisplay.length; i++){
                    if(this.state.clientsToDisplay[i].Netpass == this.state.selectedClient){
                        client = this.state.clientsToDisplay[i];
                    }
                }
            };
       
        
        const finfo = this._form.getValue();
        var toSendStrSes;
        if(finfo){
            
            info.Clientfirstname = client.Firstname;
            info.Clientlastname = client.Lastname;
            info.DateTime = finfo.Date;
            info.assignedTo = myInfo.Netpass;
            info.SessionType = finfo.SessionType;
            info.clientEmail = client.Email;
            
            toSendStrSes = JSON.stringify(info);
            console.log("myInfoFor",toSendStrSes);
            
            if(client.SessionsRemaining != '0' || client.AdditionalSessions != '0'){
            
             var sessType = finfo.SessionType;
            console.log(sessType);
            if(sessType=='Individual'){
                var numSess;
                if(client.PackageType == 'Individual'){
                    numSess = client.SessionsRemaining;
                    console.log('before',numSess);
                    numSess = parseInt(numSess, 10);
                    numSess--;
                    console.log('after',numSess);
                }else if(client.AdditionalPackage != null){
                    numSess = client.AdditionalSessions;
                    console.log('before',client.AdditionalSessions);
                    numSess = parseInt(numSess, 10);
                    numSess--;
                     console.log('after',numSess);
                }else if(client.AdditionalPackage == null){
                    Alert.alert("Client does not have this package.");
                }
                var temp = {
                     sType: sessType,
                      sessionsLeft: numSess,
                      netpass: client.Netpass,
                };
                
                const toSendStr = JSON.stringify(temp);
                console.log(toSendStr);
                if(numSess >= 0){
                try{
                 
                let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateSessionsLeft.php',{
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
                      this._addSession(toSendStrSes);
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }
                }else{
                    Alert.alert("This client does not have any individual sessions left!");
                }
                
            }
            else if(sessType=='Partner'){
                var numSess;
                if(client.PackageType == 'Partner'){
                    numSess = client.SessionsRemaining;
                    console.log('before',numSess);
                    numSess = parseInt(numSess, 10);
                    numSess--;
                    console.log('sfter',numSess);
                }else if(client.AdditionalPackage != null){
                    numSess = client.AdditionalSessions;
                    console.log('before',numSess);
                    numSess = parseInt(numSess, 10);
                     console.log('after',numSess);
                    numSess--;
                }else if(client.AdditionalPackage == null){
                    Alert.alert("Client does not have this package.");
                }
                var temp = {
                     sType: sessType,
                      sessionsLeft: numSess,
                      netpass: client.Netpass,
                };
                
                const toSendStr = JSON.stringify(temp);
                console.log(toSendStr);
                if(numSess > 0){
                try{
                 
                let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateSessionsLeft.php',{
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
                      this._addSession(toSendStrSes);
                      this.props.navigation.navigate('TrainerH');
                  } else{
                        Alert.alert(rJSON["message"]);
                    }
     }  catch(error){
                console.log(error);
            }
                }else{
                    Alert.alert("Client does not have any more Partner sessions left.");
                }
            }
            
        
                 }
        }else {
            Alert.alert("Client does not have any more sessions left.");
        }
    }
    async _addSession(toSendStr){
        console.log("tosend",toSendStr.Netpass);
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

loadClients() {
  return this.state.clientsToDisplay.map((client,index) => (
     <Picker.Item label={client.Firstname+" "+client.Lastname} value={client.Netpass} key={index} />
  ))
}
    
     render() {
        
                
        const { navigation } = this.props;
        const myInfo = navigation.getParam('myInfo', 'NO-ID');
         console.log("trainer info",myInfo);

         return(
             <ScrollView>
            <View>
             <Text style = {styles.title}> Client </Text>
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
             
             <TouchableOpacity onPress ={() => this._onClick(myInfo)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </View>
            </TouchableOpacity>
    
            </View>
            </ScrollView>
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
    fontSize: 20,
    alignSelf: 'center',
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