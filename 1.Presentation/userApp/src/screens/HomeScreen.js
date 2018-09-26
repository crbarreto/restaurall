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
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MapView from 'react-native-maps';
import { Searchbar } from 'react-native-paper';

// Components
import { BoldText, RegularText, LightText } from '../components/StyledText';
import { Header } from '../components/Components';

// Constants
import COLORS from '../constants/Colors';

type Props = {};
type State = {
  searchAddress: String
};

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    drawerLabel: 'Pantalla principal',
    drawerIcon: 'home'
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
        >
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
