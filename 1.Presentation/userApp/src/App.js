/**
 * React Native App
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import COLORS from './constants/Colors';

// Navigator
import RootNavigator from './navigation/RootNavigator';
// Redux Store
import configureStore from './configureStore';
const { store, persistor } = configureStore();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.main,
    accent: COLORS.secondary,
  },
  fonts: {
    regular: 'Rajdhani-Regular',
    medium: 'Rajdhani-Medium',
    light: 'Rajdhani-Light',
    thin: 'Rajdhani-Bold',
  }
};

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
