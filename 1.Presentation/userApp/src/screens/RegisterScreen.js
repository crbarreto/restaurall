import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Assets
import { COLORS } from '../constants/Theme';
const logoImage = require('../assets/images/logo.png');

// Components
import { CustomButton } from '../components/Components';
import { LightText, RegularText, BoldText } from '../components/StyledText';

// Validator
const mailValidator = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

type Props = {};
type State = {
    name: string,
    email: string,
    address: string,
    password: string,
    confirmPassword: string,
    city: string,
    isEmailValid: boolean,
    isPasswordValid: boolean,
};

class RegisterScreen extends React.Component<Props, State> {

    static navigationOptions = {
        header: () => null,
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
            city: '',
            isEmailValid: true,
            isPasswordValid: true,
        };

        this._handleChangeInput = this._handleChangeInput.bind(this);
        this._validateEmail = this._validateEmail.bind(this);
        this._validatePassword = this._validatePassword.bind(this);
        this._goBack = this._goBack.bind(this);
    }

    _handleChangeInput(inputReference, value) {
        this.setState({
            [`${inputReference}`]: value,
        });

        if (inputReference === 'email')
            this._validateEmail();

        if (inputReference === 'password')
            this._validatePassword();
    }

    _validateEmail() {
        const { email } = this.state;

        this.setState({
            isEmailValid: mailValidator.test(email),
        });
    }

    _validatePassword() {
        const { password, confirmPassword } = this.state;

        if (confirmPassword !== password)
            this.setState({
                isPasswordValid: false,
            });

    }

    _goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const {
            name,
            email,
            address,
            password,
            confirmPassword,
            isEmailValid,
            isPasswordValid
        } = this.state;

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                enableOnAndroid
                scrollEnabled
            >

                <View style={[
                    styles.topDecorator,
                    { right: 0 }
                ]} />

                <View style={[
                    styles.topDecorator,
                    { left: 0 }
                ]} />

                <View style={styles.logoContainer}>
                    <Image source={logoImage} style={styles.logoImage} />
                    <RegularText style={styles.titleText}>Registro</RegularText>
                    <RegularText style={styles.subTitle}>Por favor completa el formulario y estarás registrado en la aplicación:</RegularText>
                </View>

                <TextInput
                    style={styles.defaultInput}
                    label='Nombre'
                    value={name}
                    onChangeText={(value) => this._handleChangeInput('name', value)}
                />

                <TextInput
                    style={styles.defaultInput}
                    label='Correo'
                    value={email}
                    error={!isEmailValid ? 'Ingrese un correo valido' : ''}
                    onChangeText={(value) => this._handleChangeInput('email', value)}
                />

                <TextInput
                    style={styles.defaultInput}
                    label='Contraseña'
                    value={password}
                    secureTextEntry
                    onChangeText={(value) => this._handleChangeInput('password', value)}
                />

                <TextInput
                    style={styles.defaultInput}
                    label='Confirmar contraseña'
                    value={confirmPassword}
                    error={!isPasswordValid ? 'Las contraseñas no coinciden' : ''}
                    secureTextEntry
                    onChangeText={(value) => this._handleChangeInput('confirmPassword', value)}
                />

                <Button
                    style={{
                        marginTop: '5%',
                        fontWeigth: 'bold',
                    }}
                    mode="contained"
                    onPress={() => false}
                >
                    Registrarme
                </Button>

                <BoldText
                    style={{
                        marginTop: '5%',
                        marginBottom: '20%',
                        color: COLORS.main,
                        fontSize: 16,
                        textAlign: 'center',

                    }}
                    onPress={this._goBack}
                >
                    REGRESAR
                </BoldText>

            </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainWhite,
    },
    contentContainer: {
        paddingHorizontal: '10%',
    },
    defaultInput: {
        marginBottom: '1%',
        backgroundColor: 'transparent'
    },
    logoContainer: {
        alignItems: 'center',
        paddingBottom: '8%',
        paddingTop: '8%',
        width: '100%',
        zIndex: 3,
    },
    logoImage: {
        marginBottom: '4%',
        height: 80,
        width: 80,
    },
    titleText: {
        color: COLORS.main,
        fontSize: 35,
    },
    subTitle: {
        color: COLORS.main,
        fontSize: 18,
        marginTop: '1%',
        textAlign: 'center',
    },
    topDecorator: {
        height: 80,
        backgroundColor: COLORS.main,
        borderBottomStartRadius: 100,
        borderBottomEndRadius: 100,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2,
    }
});

export default RegisterScreen;