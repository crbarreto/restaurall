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
import SplashScreen from 'react-native-splash-screen';


// Components
import { BoldText, RegularText, LightText } from '../components/StyledText';
import { Header } from '../components/Components';

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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Header navigation={this.props.navigation} />

        <View style={styles.welcomeContainer}>
          <RegularText style={styles.mainText}>
            Bienvenido
            <BoldText style={styles.mainText}> Cristian Barreto</BoldText>
          </RegularText>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  contentContainer: {
    flex: 1,
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
