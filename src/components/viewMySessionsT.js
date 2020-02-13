import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

export default class ViewTrainers extends React.Component {
    static navigationOptions = {
    title: "My Sessions",
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
             sessions : [],
             trainerSes: [],
             clientSes: [],
             clientsToSend: [],
             trainerInfo: '',
         }
    }
    
async componentDidMount(){
    const { navigation } = this.props;
    netpass = navigation.getParam('inNetpass', 'NO-ID');
    try{
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/getAllSession.php',{
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
            
           
        for (let i =0; i<this.state.sessions.length; i++){
                if(this.state.sessions[i].AssignedTo == netpass){
        
                    let a = this.state.clientSes.slice(); //creates the clone of the state
                    a[i] = this.state.sessions[i];
                    this.setState({clientSes: a});
                }
            }
             console.log("mysess",this.state.clientSes);
        
            
    }catch(error){
            console.log(error);
        }
}
    
    render(){
        const { navigation } = this.props;
        var mySessions = [] ;
        mySessions = this.state.clientSes;
        var clients = [] ;
        clients = navigation.getParam('myClients', 'NO-ID');
        console.log("clients",this.state.clientSes);
        
        const listItems = mySessions.map((session,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificSess',{clients:clients,selectedSess: session,sessionsToSend: mySessions,type:'trainer'})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{session.ClientFirstName} {session.ClientLastName}-{session.Date}</Text></Text>
            </View>
            </TouchableOpacity>
                );

        
        return(
            
        
            <ScrollView style={styles.container}>
            {listItems}
            </ScrollView>
            
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
});