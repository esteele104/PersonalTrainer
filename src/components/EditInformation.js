import React from 'react';
import { View, Text, Image, Button, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Picker, StyleSheet, AsyncStorage, NetInfo,Animated } from 'react-native';
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
  Partner: 'Partner'
});

var affiliation = t.enums({
  Faculty: 'Faculty',
  Staff: 'Staff',
  Student: 'Student'
});

var numSessions = t.enums({
  4: '4',
  7: '7',
  10: '10',
});

    const client = t.struct({
      Netpass: t.String,
      Password: t.String,
      Email: t.String,
      Firstname: t.String,
      Lastname: t.String,
      Gender: Gender,
      SchoolAffiliation: affiliation, 
      PackageType: PType,
      SessionsRemaining: numSessions,
      
      
    });
const trainer = t.struct({
      Netpass: t.String,
      Password: t.String,
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
        if(finfo){
    try{
        
        const toSendStr = JSON.stringify({userInfo:finfo,utype:type}); 
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
           <View style = { styles.container }>
            <ScrollView>
            {form1}
            {form2}
            
            <TouchableOpacity onPress ={() => this._onClick(type)}>
            <View style = {styles.button}>
            <Text style={styles.buttonText}><Text>Update Info</Text></Text>
            </View>
            </TouchableOpacity>
            </ScrollView> 
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