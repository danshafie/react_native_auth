import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Spinner, Button } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyCTZpiIvVhfMHUeUvOeGoWMcIJRtyb2j5E',
        authDomain: 'authentication-20303.firebaseapp.com',
        databaseURL: 'https://authentication-20303.firebaseio.com',
        storageBucket: 'authentication-20303.appspot.com',
        messagingSenderId: '577821308781'
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
