import React from 'react';
import { View, Text, Image, Alert, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Header } from 'react-native-elements';

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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        //margin: 4
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
        right:10,
        borderRadius: 60,
       // width: 60,
        height: 80,
        
        //backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15
    },
 
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }
});



var trainers= [];
var toDisplay = [];
var input = '';





export default class ViewTrainers extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
    return {
    title: "Trainers",
     headerTitleStyle: {
            //fontWeight: '300',
            fontSize: 20,
            color: 'white'
          },
        headerRight: (
       <TouchableHighlight 
            style={styles.btn}
            onPress={() => navigation.navigate('AdminH')}>
        <Icon
          name='home'
          size={40}
          color='white'
        />
      </TouchableHighlight>
        
        
    ),
    };
};
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

/*
Fetches all the data from the Trainers table matching the val parameter.
*/

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
    
   
/*
Fetches all the data from the Trainers table.
*/
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
        
        <TouchableOpacity onPress ={() => this.props.navigation.navigate('SpecificTrainer',{selectedTrainer: trainer, title: trainer.Firstname})} key={index}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>{trainer.Firstname+" "+trainer.Lastname}</Text></Text>
            </View>
            </TouchableOpacity>
                );
        return(
            <View>
             <Input
                  containerStyle = {styles.viewHolder}
                  placeholder='Search trainer name or netpass'
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

