/* 
  * Home Screen
  * @flow
 */

// Node modules
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animated from 'react-native-animatable';
import SplashScreen from 'react-native-splash-screen';


// Components
import { MonoText, BoldText, RegularText, LightText } from '../components/StyledText';
import { BCHeader } from '../components/BCHeader';

// Constants
import COLORS from '../constants/Colors';

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Pantalla principal',
    drawerIcon: 'home'
  };

  componentDidMount() {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.container}>

        <BCHeader navigation={this.props.navigation} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <RegularText style={styles.mainText}>
              Bienvenido
            <BoldText style={styles.mainText}> Cristian Barreto</BoldText>
              , aquí el estado de su cuenta:
            </RegularText>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: '4%',
  },
  welcomeContainer: {
    marginHorizontal: '10%',
    marginVertical: '2%',
    width: '80%'
  },
  mainText: {
    color: '#000',
    fontSize: 20
  },
});
