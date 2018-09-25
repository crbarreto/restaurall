/* 
 * Button component
 * @flow
*/

// Node modules
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

// Assets
import COLORS from '../constants/Colors';

type Props = {
    style: any,
    title: string,
    onPress: () => void,
};
type State = {};

export class CustomButton extends Component<Props, State> {
    render() {
        const { title, onPress } = this.props;

        return (

            <Button {...this.props} onPress={onPress} color={COLORS.main}>
                <Text style={buttonStyle.text}>{title}</Text>
            </Button>
        );
    }
}

const buttonStyle = StyleSheet.create({
    text: {
        fontFamily: 'Rajdhani-Bold',
        color: '#fff',
        fontSize: 20
    },
    disabledContainerStyle: {
        opacity: .7
    }
});
