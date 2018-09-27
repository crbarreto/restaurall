/**
 * React Native App
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './constants/Theme';

// Navigator
import RootNavigator from './navigation/RootNavigator';
// Redux Store
import configureStore from './configureStore';
const { store, persistor } = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <RootNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
