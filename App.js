import React from 'react';
import { AppRegistry,StyleSheet, Image, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage, Alert, NetInfo} from 'react-native';
import { createStackNavigator, TabNavigator} from 'react-navigation';
import {SecureStore} from 'expo';
import t from 'tcomb-form-native'; 

import StartPage from './src/components/StartPage.js';
import AdminLogin from './src/components/AdminLog.js';
import AdminHome from './src/components/AdminHome.js';
import ClientHome from './src/components/ClientHome.js';
import TrainerHome from './src/components/TrainerHome.js';
import ViewTrainers from './src/components/ViewTrainers.js';
import CreateAccount from './src/components/CreateAccount.js';
import CreateTrainerAcc from './src/components/CreateTrainerAcc.js';
import ConfirmationPage from './src/components/ConfirmationPage.js';
import SessionSignUp from './src/components/SessionSignUp.js';
import SessionsView from './src/components/SessionsView.js';
import SpecificTrainer from './src/components/SpecificTrainer.js';
import ViewClients from './src/components/ViewClients.js';
import SpecificClient from './src/components/SpecificClient.js';
import viewMySessionsT from './src/components/viewMySessionsT.js';
import SpecificSess from './src/components/SpecificSess.js';
import ViewMyClients from './src/components/ViewMyClients.js';
import EditInformation from './src/components/EditInformation.js';



const RootStack = createStackNavigator({
    Start: StartPage,
    Admin: AdminLogin,
    AdminH: AdminHome,
    ClientH: ClientHome,
    TrainerH: TrainerHome,
    TrainersView: ViewTrainers,
    CreateAccount: CreateAccount,
    CreateTrainerAcc: CreateTrainerAcc,
    ConfirmationPage: ConfirmationPage,
    SessionSignUp: SessionSignUp,
    SessionsView: SessionsView,
    SpecificTrainer: SpecificTrainer,
    ViewClients: ViewClients,
    SpecificClient: SpecificClient,
    viewMySessionsT: viewMySessionsT,
    SpecificSess: SpecificSess,
    ViewMyClients: ViewMyClients,
    EditInformation: EditInformation,
    

},
{
initialRouteName: 'Start',
navigationOptions: {
    headerTitle: <Image
    source={{uri:'https://careers.insidehighered.com/getasset/3f9fccd3-b35b-45f9-b76e-90dc3972a015/;w=600;h=315'}}
    style={{ width: 290, height: 40 }}
  />,
  headerStyle: {
    backgroundColor: '#003b71',
  },


},
}
);

export default class App extends React.Component {
render() {
return <RootStack />;
}
}