/*
  * Home Screen
  * @flow
 */

// Node modules
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Searchbar } from 'react-native-paper';

// Components
import { BoldText, RegularText, LightText } from '../components/StyledText';
import { Header } from '../components/Components';

// Constants
import { COLORS } from '../constants/Theme';
const { height, width } = Dimensions.get('window');
type Props = {};
type State = {
  searchAddress: String
};

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Pantalla principal',
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" size={24} color={tintColor} />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      searchAddress: '',
    };
  }

  componentDidMount() {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render() {

    const { searchAddress } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ zIndex: 2 }}>
          <Header navigation={this.props.navigation} />

          <Searchbar
            style={{ marginHorizontal: '5%', width: '90%' }}
            placeholder="Search"
            onChangeText={query => { this.setState({ searchAddress: query }); }}
            value={searchAddress}
          />

        </View>

        <MapView
          style={styles.map}

          region={{
            latitude: 4.653203,
            longitude: -74.061226,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.96,    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
