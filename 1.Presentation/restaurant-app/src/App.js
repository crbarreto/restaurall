/**
 * React Native App
 * @flow
 */

// Node modules
import React, { Component } from 'react';

// Navigator
import RootNavigator from './navigation/RootNavigator';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootNavigator />
    );
  }
}