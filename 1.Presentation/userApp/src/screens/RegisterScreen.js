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
                    label='Dirección'
                    value={address}
                    onChangeText={(value) => this._handleChangeInput('address', value)}
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
                    style={{ marginTop: '5%', marginBottom: '10%', fontWeigth: 'bold' }}
                    mode="text" >
                        Registrarme                    
                </Button>

            </KeyboardAwareScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.mainWhite,
    },
    contentContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '2%',
    },
    defaultInput: {
        marginBottom: '2%',
        backgroundColor: 'transparent'
    },
    logoContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.tertiary,
        paddingBottom: '8%',
        paddingTop: '8%',
        width: '100%'
    },
    logoImage: {
        marginBottom: '4%',
        height: 140,
        width: 140,
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
    }
});

export default RegisterScreen;