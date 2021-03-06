
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation';

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
import emailTrainer from './src/components/emailTrainer.js';
import viewHours from './src/components/viewHours.js';
import viewAllSessions from './src/components/viewAllSessions.js';
import EditSession from './src/components/EditSession.js';
import passwordChange from './src/components/passwordChange.js';
import assignTrainer from './src/components/assignTrainer.js';
import completedSessions from './src/components/completedSessions.js';
import SpecificSessC from './src/components/SpecificSessC.js';
import assignClient from './src/components/assignClient.js';
import Test from './src/components/test.js';
 



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
    emailTrainer: emailTrainer,
    viewHours: viewHours,
    viewAllSessions: viewAllSessions,
    EditSess: EditSession,
    passwordChange: passwordChange,
    assignTrainer: assignTrainer,
    completedSessions: completedSessions,
    SpecificSessC: SpecificSessC,
    assignClient: assignClient,
    Test: Test,
    

},
{
initialRouteName: 'Start',
navigationOptions: {
    
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
