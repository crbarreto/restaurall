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
import {
  Searchbar,
  Dialog,
  Portal,
  Paragraph,
  Button,
  Modal,
  Divider
} from 'react-native-paper';
import MapView, { Marker, Callout } from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNGooglePlaces from 'react-native-google-places';

// Components
import { BoldText, RegularText, LightText } from '../components/StyledText';
import { Header } from '../components/Components';

// Constants
import { COLORS } from '../constants/Theme';
const { height, width } = Dimensions.get('window');
type Props = {};
type State = {
  searchAddress: String,
  position: {
    latitude: Number,
    longitud: Number
  },
  isDialogVisible: boolean,
  dialogContent: {
    title: String,
    content: String,
    mainButtonTitle: String,
    mainAction: VoidFunction,
  },
  searchResults: Array,
  isSearchResultsViewVisible: boolean,
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
      position: {
        latitude: 4.653203,
        longitude: -74.061226,
      },
      isDialogVisible: false,
      dialogContent: {
        title: '',
        content: '',
        mainButtonTitle: 'Entendido',
        mainAction: () => false,
      },
      searchResults: [],
      isSearchResultsViewVisible: false,
    };

    this.autocompletSearchWithPlaces = this.autocompletSearchWithPlaces.bind(this);
    this.getCurrentPositionAndUpdateMap = this.getCurrentPositionAndUpdateMap.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  autocompletSearchWithPlaces(query: string) {
    const { latitude, longitude } = this.state.position;
    const searchOptions = {
      type: 'establishment',
      country: 'CO',
      latitude,
      longitude,
      radius: 20
    };

    this.setState({ searchAddress: query });

    RNGooglePlaces.getAutocompletePredictions(query, searchOptions)
      .then((places) => {
        this.setState({
          searchResults: places.map((place) => {
            return { name: place.fullText.split(',')[0], id: place.placeID };
          })
        });
      })
      .catch(error => console.log(error.message));
  }

  getCurrentPositionAndUpdateMap() {

    this.hideDialog();

    navigator.geolocation.getCurrentPosition(
      (currentPosition) => {
        const { coords } = currentPosition;
        if (coords)
          this.setState({
            position: coords,
          });
      }, (error) => {
        this.showDialog({
          title: 'Error',
          content: 'Tuvimos un error al obtener tu ubicación, intenta de nuevo.',
          mainButtonTitle: 'Reintentar',
          mainAction: this.getCurrentPositionAndUpdateMap
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  showDialog({ title, content, mainButtonTitle, mainAction }) {
    this.setState({
      dialogContent: {
        title,
        content,
        mainButtonTitle,
        mainAction,
      },
      isDialogVisible: true,
    });
  }

  hideDialog() {
    this.setState({
      isDialogVisible: false,
    });
  }

  componentDidMount() {
    // Hide SplashScreen
    SplashScreen.hide();
    // Get user position
    this.getCurrentPositionAndUpdateMap();
  }

  componentDidUpdate() {
    if (this.refs['userLocationMarker'])
      this.refs['userLocationMarker'].showCallout();
  }

  render() {

    const {
      searchAddress,
      position,
      isDialogVisible,
      dialogContent,
      searchResults,
      isSearchResultsViewVisible
    } = this.state;

    return (
      <View style={styles.container}>

        <View style={{ zIndex: 2 }}>
          <Header navigation={this.props.navigation} />

          <Searchbar
            ref="searchbar"
            style={styles.searchAreaItem}
            placeholder="Búsqueda"
            onChangeText={this.autocompletSearchWithPlaces}
            value={searchAddress}
          />

          {
            searchResults.length ?
              <View style={[styles.searchAreaItem, { backgroundColor: '#fff', paddingHorizontal: '2%', paddingTop: '2%' }]}>
                {
                  searchResults.map((place, index) => {
                    return (
                      <View key={place.id} style={styles.searchResultItem}>
                        <RegularText style={styles.searchResultItemText}>{place.name}</RegularText>
                        {(index + 1) === searchResults.length ? null : <Divider />}
                      </View>
                    );
                  })
                }
              </View>
              : null
          }
        </View>

        <MapView
          style={styles.map}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>

          <Marker
            ref="userLocationMarker"
            calloutAnchor={{ x: 0.5, y: -0.1 }}
            coordinate={position}
            image={require('../assets/icons/pin.png')} >
            <Callout tooltip style={styles.calloutContainer} >
              <BoldText style={styles.calloutText}>Ubicación actual</BoldText>
            </Callout>
          </Marker>

        </MapView>

        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={this.hideDialog}>
            <Dialog.Title>{dialogContent.title}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{dialogContent.content}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={dialogContent.mainAction}>{dialogContent.mainButtonTitle}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View >
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
  searchAreaItem: {
    marginHorizontal: '5%',
    width: '90%',
  },
  calloutContainer: {
    height: 25,
    paddingBottom: 5,
    width: 120,
  },
  calloutText: {
    alignSelf: 'center',
    backgroundColor: COLORS.main,
    color: '#fff',
    padding: 4,
  },
  searchResultItem: {
    marginVertical: '2%',
  },
  searchResultItemText: {
    fontSize: 16,
    paddingVertical: '1%'
  },
});
