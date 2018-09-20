/**
 * New User Screen
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { BCHeader, BCButton } from '../../components/bc-components';

// Steps
import NUFirstStep from './NUFirstStep';
import NUSecondStep from './NUSecondStep';

type Props = {};
type State = {
    step: number,
    userData: {
        phone: string,
        mail: string,
        documentPhotoName: string,
        realPhotoName: string,
    }
};
export default class NewUserScreen extends Component<Props, State> {
    static navigationOptions = {
        drawerLabel: 'Agregar usuario',
        drawerIcon: 'user-plus'
    };

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            userData: {
                phone: '',
                mail: '',
                documentPhotoName: '',
                realPhotoName: '',
            }
        };

        this._nextStep = this._nextStep.bind(this);
        this._prevStetp = this._prevStetp.bind(this);
    }

    _nextStep() {
        this.setState({ step: this.state.step + 1 });
    }

    _prevStetp() {
        this.setState({ step: this.state.step - 1 });
    }

    render() {
        const activeStep = () => {
            switch (this.state.step) {
                case 1:
                    return <NUFirstStep next={this._nextStep} navigation={this.props.navigation} />;
                    break;
                case 2:
                    return <NUSecondStep next={this._nextStep} prev={this._prevStetp} />;
                    break;

                default:
                    return null;
                    break;
            }
        }

        return (
            <View style={styles.container}>
                {activeStep()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#123',
        flex: 1
    }
});