/**
 * Navigation Menu Component
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
const firebaseAuth = firebase.auth();

// Constants
import { COLORS } from '../constants/Theme';

// Componenets
import { RegularText, BoldText } from './StyledText';
import { defaultServerConfig as SERVER } from '../constants/ServerConfig';

// Assets
const userDefaultIcon = require('../assets/images/icons/user.png');

// Redux actions
import { getData, getDataFailure, getDataSuccess } from '../actions';

type Props = {
    items: any,
    activeItemKey: any,
    activeTintColor: any,
    activeBackgroundColor: any,
    inactiveTintColor: any,
    inactiveBackgroundColor: any,
    itemsContainerStyle: any,
    itemStyle: any,
    labelStyle: any
};

class NavigationMenuComponent extends Component<Props, State> {
    constructor(props) {
        super(props);

        this._handleExit = this._handleExit.bind(this);
        this._handleProfile = this._handleProfile.bind(this);
        this._handleLogout = this._handleLogout.bind(this);
        this._getUserData = this._getUserData.bind(this);
    }

    _handleLogout() {

        this.props.dispatch(getDataSuccess({}));

        firebase.auth().signOut()
            .then(res => this.props.navigation.navigate('Auth'))
            .catch(err => alert(`Sucedio un problema al cerrar la sesión \n\n ${err.message}`))
    }

    _handleExit() {

        Alert.alert(
            'Cerrar sesión',
            'Está a punto de cerrar sesión, ¿Seguro que desea hacerlo?',
            [
                {
                    text: 'Cerrar sesión',
                    onPress: this._handleLogout
                },
                { text: 'Cancelar', onPress: () => false, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    _handleProfile() {

        /* if (this.props.navigation)
            this.props.navigation.navigate('ProfileScreen'); */
    }

    _getUserData() {
        // Indicate to reduce we going to load data
        this.props.dispatch(getData());
        // Try to load user Data, al least the uid and the token
        const { token, uid } = this.props.user.data;

        if (token && uid) {
            // Load the user info and store in local storage
            const { host, port, prefix, routes } = SERVER;

            fetch(`${host}:${port}/${prefix}/${routes.user}/${uid}`, { method: 'get' })
                .then(res => res.json())
                .then(userData => {

                    if (userData) {
                        const { role, displayName, email, photoURL, idNetwork } = userData;
                        // Save the user data
                        this.props.dispatch(
                            getDataSuccess({ ...this.props.user.data, role, displayName, email, photoURL, idNetwork })
                        );
                    }

                })
                .catch(err => {
                    this.props.dispatch(getDataFailure());
                    console.log('Error al obtener los datos del usuario: ', err);
                });
            return true;
        }
        else {
            return false;
        }
    }

    componentWillMount() {
        // Create an interval for get the user info
        let result = false;

        const intervalID = setInterval(() => {
            if (!result)
                result = this._getUserData();
            else
                clearInterval(intervalID);
        }, 500);

    }

    render() {

        const { displayName, email, photoURL, role } = this.props.user.data;

        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

                    <View style={styles.infoContainer}>
                        <TouchableOpacity onPress={this._handleProfile}>
                            <Image source={photoURL && photoURL !== 'https://none' ? { uri: photoURL } : userDefaultIcon} style={styles.userImage} />
                            <BoldText style={styles.userName}>{displayName || 'Nombre de usuario'}</BoldText>
                            <RegularText style={styles.userMail}>{email || 'Correo'}</RegularText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.exit} onPress={this._handleExit}>
                            <Icon name="exit-to-app" size={24} color={COLORS.main} />
                        </TouchableOpacity>
                    </View>

                    <DrawerItems
                        itemStyle={styles.item}
                        labelStyle={styles.itemLabel}
                        activeTintColor={COLORS.main}
                        inactiveTintColor="#000"
                        {...this.props}
                    />

                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        paddingVertical: '4%',
        paddingHorizontal: '5%',
    },
    item: {
        marginVertical: 0
    },
    itemLabel: {
        fontFamily: 'Rajdhani-Regular',
        fontSize: 20,
        fontWeight: 'normal'
    },
    userImage: {
        borderRadius: 50,
        marginVertical: '8%',
        height: 60,
        width: 60
    },
    userName: {
        color: '#000',
        fontSize: 18
    },
    userMail: {
        color: COLORS.mainDark,
        fontSize: 12
    },
    exit: {
        position: 'absolute',
        bottom: '20%',
        right: '10%',
    }
});

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export const NavigationMenu = connect(mapStateToProps)(NavigationMenuComponent);
