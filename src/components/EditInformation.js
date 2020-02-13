import React from 'react';
import { View, Text, Image, Button, Alert,  TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import {SecureStore} from 'expo';

const Form = t.form.Form;

var Gender = t.enums({
  Male: 'Male',
  Female: 'Female'
});

var PType = t.enums({
  Individual: 'Individual',
  Partner: 'Partner',
  MBM: 'Mind, Body, Me'
});

var affiliation = t.enums({
  Faculty: 'Faculty',
  Staff: 'Staff',
  Student: 'Student'
});


    const client = t.struct({
      Netpass: t.String,
      Email: t.String,
      Firstname: t.String,
      Lastname: t.String,
      Gender: Gender,
      SchoolAffiliation: affiliation, 
      PackageType: PType,
      SessionsRemaining: t.Number,
      AdditionalPackage: t.maybe(PType),
      AdditionalSessions: t.maybe(t.Number),
      Availability: t.maybe(t.String),
      
      
    });
const trainer = t.struct({
      Netpass: t.String,
      Email: t.String,
      Firstname: t.String,
      Lastname: t.String,
      Gender: Gender,
});

export default class EditInformation extends React.Component {
        constructor(props)
    {
        super();
        
        this.state = {
            value : {
              Netpass :'',
              Password: '',
              Email: '',
              Firstname: '',
              Lastname: '',
              Gender: '',
              PackageType: '',
              SchoolAffiliation: '', 
              SessionsRemaining: '',
              AdditionalPackage:'',
              AdditionalSessions: '',
            }
        }
                   
    }
    options = {
            auto: 'placeholders',
            fields: {
                Netpass: {
                    label: 'Netpass Username', // <= label for the name field
                    onSubmitEditing: () => this._form.getComponent('Password').refs.input.focus()
                },
                Password: {
                    label: 'Password',
                },
                Firstname: {
                    label: 'First Name',
                },
                Lastname: {
                    label: 'Last Name',
                },
                Email: {
                    label: 'Email',
                },
                SchoolAffiliation: {
                    label: 'School Affiliation',
                },
                PackageType: {
                    label: 'Package Type',
                },
                Gender: {
                    label: 'Gender',
                },
                SessionsRemaining: {
                    label: 'Number of Sessions',
                },
                AdditionalPackage: {
                    label: 'Additional Package Type',
                },
                AdditionalSessions: {
                    label: 'Number of Additional Sessions',
                },
                Availability: {
                    label: 'Availability',
            }
            }
        };

    async componentDidMount(){
        const { navigation } = this.props;
         var clientInfo = navigation.getParam('clientInfo', 'NO-ID');
        var trainerInfo = navigation.getParam('trainerInfo', 'NO-ID');
        console.log(clientInfo);
         var type = navigation.getParam('type', 'NO-ID');
        if(type=='trainer'){
        
        this.setState({value:trainerInfo});
        }
        else {
            this.setState({value:clientInfo});
        }
    }

async _onClick(type){
    const finfo = this._form.getValue();
    if(finfo.PackageType === finfo.AdditionalPackage){
        Alert.alert("Additional package type can't be the same as original package type");
    }else{
    
        if(finfo){
            if(type=='trainer'){
    try{
        
        const toSendStr = JSON.stringify({userInfo:finfo}); 
        console.log(toSendStr);
        let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateInfo.php',{
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
          } else{
                Alert.alert(rJSON["message"]);
            }
     }  catch(error){
                console.log(error);
            }
}
        else if(type=='client'){
        try{
        
        const toSendStr = JSON.stringify({userInfo:finfo}); 
        console.log(toSendStr);
        let response = await fetch('http://ic-research.eastus.cloudapp.azure.com/~esteele/updateClient.php',{
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
              this.props.navigation.goBack();
          } else{
                Alert.alert(rJSON["message"]);
            }
     }  catch(error){
                console.log(error);
            }
        }
        }
    }
}
    
 
    render(){
        const { navigation } = this.props;
        var type = navigation.getParam('type', 'NO-ID');
       
        
        var form1;
        var form2;
        if(type == 'trainer'){
            form1 = 
                (<Form 
                    type={trainer} 
                    options = {this.options}
                    value = {this.state.value}
                    ref={c => this._form = c}
                />
                    );
        }
        if(type == 'client'){
            form2 = 
                (<Form 
                    type={client} 
                    options = {this.options}
                    value = {this.state.value}
                    ref={c => this._form = c}
                />
                    );
        }
        
        return(
            <ScrollView>
           <View style = { styles.container }>
            
            {form1}
            {form2}
            
            <TouchableOpacity onPress ={() => this._onClick(type)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Update Info</Text></Text>
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
    height: 60,
    width: 380,
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