/**
 * Authentication Loading Screen
 * @flow
 */

// Node modules
import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import firebase from 'react-native-firebase';
const firebaseAuth = firebase.auth();

type Props = {};
type State = { user: firebaseAuth.User };
export default class AuthLoadingScreen extends React.Component<Props, State> {
    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
            user: null,
        };
    }

    /**
     * Listen for any auth state changes and update component state
     */
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });

            if (user) this.props.navigation.navigate('App', { user: user });
            else this.props.navigation.navigate('Auth');
        });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}