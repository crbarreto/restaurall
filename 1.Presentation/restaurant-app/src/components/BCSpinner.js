/**
 * React Spinner
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

// Components
import COLORS from '../constants/Colors';
import { RegularText } from './StyledText';

export class BCSpinner extends Component {
    render() {
        return (
            <View style={styles.spinnerContainer}>
                <RegularText style={styles.spinnerText}>Un momento por favor</RegularText>
                <Spinner isVisible={true} size={60} type="ThreeBounce" color={COLORS.mainLightBlue} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.mainLightGray,
        bottom: 0,
        left: 0,
        position: 'absolute',
        paddingTop: '60%',
        top: 0,
        right: 0,
        zIndex: 10
    },
    spinnerText: {
        color: COLORS.mainBlue,
        fontSize: 30,
    }
});