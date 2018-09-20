/**
 * Navigation Menu Component
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
const firebaseAuth = firebase.auth();

// Constants
import COLORS from '../constants/Colors';

// Componenets
import { RegularText, BoldText } from './StyledText';

// Assets
const userDefaultIcon = require('../assets/images/icons/user.png');

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
export class BCNavigationMenu extends Component<Props> {
    constructor(props) {
        super(props);

        this._handleExit = this._handleExit.bind(this);
    }

    _handleExit() {

        Alert.alert(
            'Cerrar sesión',
            'Está a punto de cerrar sesión, ¿Seguro que desea hacerlo?',
            [
                {
                    text: 'Cerrar sesión',
                    onPress: () => firebase.auth().signOut()
                        .then(res => this.props.navigation.navigate('Auth'))
                        .catch(err => alert(`Sucedio un problema al cerrar la sesión \n\n ${err.message}`))
                },
                { text: 'Cancelar', onPress: () => false, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

                    <LinearGradient colors={COLORS.gradientBlue} style={styles.linearGradient}>
                        <Image source={userDefaultIcon} alt="User Image" style={styles.userImage} />
                        <BoldText style={styles.userName}>Cristian Barreto</BoldText>
                        <RegularText style={styles.userMail}>cristian.barreto@aossas.com</RegularText>
                        <TouchableOpacity style={styles.exit} onPress={this._handleExit}>
                            <Icon name="exit-to-app" size={24} color={COLORS.mainBlue} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <DrawerItems
                        itemStyle={styles.item}
                        labelStyle={styles.itemLabel}
                        activeTintColor={COLORS.mainBlue}
                        inactiveTintColor={COLORS.mainGray}
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
    item: {
        marginVertical: 0
    },
    itemLabel: {
        fontFamily: 'Rajdhani-Regular',
        fontSize: 20
    },
    linearGradient: {
        flex: 1,
        paddingVertical: '8%',
        paddingHorizontal: '5%',
    },
    userImage: {
        marginVertical: '8%',
        height: 60,
        width: 60
    },
    userName: {
        fontSize: 18
    },
    userMail: {
        color: '#fff',
        fontSize: 12
    },
    exit: {
        position: 'absolute',
        bottom: '20%',
        right: '10%',
    }
});