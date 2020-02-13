import React from 'react';
import { View, Text, Image, Button, Alert, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';


var trainers= [];
var toDisplay = [];
var input = '';





export default class ViewTrainers extends React.Component {
    static navigationOptions = {
    title: "Trainers",
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
            text: '',
        }
        }
                   

async _search(val){
    try{
        var toSend = JSON.stringify(val);
        var trainers2 = [];
            let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/filterTrainers.php',{
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
                trainers2.push(rJSON[i])
            } 
            this.setState({trainersToDisplay: []});
            
            for (let i =0; i<trainers2.length; i++){
                let a = this.state.trainersToDisplay.slice(); //creates the clone of the state
                a[i] = trainers[i];
                this.setState({trainersToDisplay: a});
            }
            console.log("train",this.state.trainersToDisplay);
    }catch(error){
            console.log(error);
        
}
}
    
   
async componentDidMount() {
    try{
            trainers = [];
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
            console.log("train",this.state.trainersToDisplay);
    }catch(error){
            console.log(error);
        }
}
    /*async componentDidUpdate(prevProps, prevState) {
        console.log("prev",prevState.trainersToDisplay.length)
        console.log("neww",this.state.trainersToDisplay.length)
        if(prevState.trainersToDisplay.length !== this.state.trainersToDisplay.length){
            
    try{
            trainers = [];
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
            console.log("train",this.state.trainersToDisplay);
    }catch(error){
            console.log(error);
        }
}
    }*/
 
    render()
    {
         const { navigation } = this.props;
        var trainers = [];
        trainers = this.state.trainersToDisplay;
        const listItems = trainers.map((trainer,index) =>
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificTrainer',{selectedTrainer: trainer})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{trainer.Firstname+" "+trainer.Lastname}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
            <View>
            
            
            <TextInput  
            style={{height: 40}}
             placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text}, () => this._search(this.state.text))}
            value={this.state.text}
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
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
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
        backgroundColor: '#26A69A',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
 
    text:
    {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 10,
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