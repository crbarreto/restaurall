/* 
  * Login screnn
  * @flow
 */

// Node modules
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  AsyncStorage
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase'; // Import Firebase for auth

// Create a firebase Auth const
const firebaseAuth = firebase.auth();

// Assets
import COLORS from '../constants/Colors';
const banconfioLogo = require('../assets/images/logo.png');

// Components
import { BCButton } from '../components/bc-components';
import { LightText, RegularText, BoldText } from '../components/StyledText';

// Validator
const mailValidator = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');

type Props = {};
type State = {
  userMail: string,
  userPassword: string,
  userMailValid: boolean,
  userPasswordValid: boolean,
  formValid: boolean,
  userForgotPassword: boolean
};

export default class LoginScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  handleViewRef = ref => this.view = ref;

  constructor(props) {
    super(props);
    this.state = {
      userMail: '',
      userPassword: '',
      userMailValid: true,
      userPasswordValid: true,
      userForgotPassword: false,
    };

    this._handleChangeUserMail = this._handleChangeUserMail.bind(this);
    this._handleChangeUserPassword = this._handleChangeUserPassword.bind(this);
    this._handleForgotPassword = this._handleForgotPassword.bind(this);
    this._handleLogin = this._handleLogin.bind(this);

  }
  _handleChangeUserMail(value) {

    this.setState({
      userMailValid: mailValidator.test(value),
      userMail: value
    });
  }

  _handleChangeUserPassword(value) {

    this.setState({
      userPasswordValid: (value.length >= 8),
      userPassword: value
    });
  }

  _handleForgotPassword() {

    this.view.fadeOutDown(500);
    setTimeout(() => this.setState({ userForgotPassword: !this.state.userForgotPassword }), 400);
  }

  _handleLogin() {

    const { userMail, userPassword, userForgotPassword } = this.state;

    // Validate Mail Input
    if (userMail === '') {
      this.setState({ userMailValid: false });
      return false;
    }

    // Validate Password Input
    if (userPassword === '') {
      this.setState({ userPasswordValid: false });
      return false;
    }

    // Firebase login
    firebaseAuth.signInAndRetrieveDataWithEmailAndPassword(userMail, userPassword)
      .then(data => {
        data.user.getIdToken(false)
          // Save the user token and keep logged in
          .then(token => AsyncStorage.setItem('userToken', token))
          .catch(err => console.log(err))

        this.props.navigation.navigate('App');
      })
      .catch(error => {
        console.error(error);
      })
  }

  render() {

    let { userMail, userPassword, userMailValid, userPasswordValid, userForgotPassword } = this.state;
    let formValid = userMailValid && userPasswordValid;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.logoContainer}>
            <RegularText style={styles.titleText}>BANCONFIO</RegularText>
            <Image source={banconfioLogo} alt="Logo Banconfio" style={styles.logoImage} />
            <RegularText style={styles.blueText}>El banco de la gente y para la gente.</RegularText>
          </View>

          <View style={styles.formContainer}>

            {
              // Render only if the user don't remember the password
              userForgotPassword ?
                <Animatable.View ref={this.handleViewRef}>
                  <RegularText style={styles.regularText}>
                    Podemos ayudarle a recuperar su contraseña, escriba el correo electronico asociado a su cuenta:
              </RegularText>
                </Animatable.View>
                :
                null
            }

            <TextField
              label='Correo'
              value={userMail}
              style={styles.regularText}
              labelTextStyle={styles.regularText}
              error={!this.state.userMailValid ? 'Ingrese un correo valido' : ''}
              onChangeText={this._handleChangeUserMail}
            />

            {
              // Render only if the user remember the password
              !userForgotPassword ?
                <Animatable.View ref={this.handleViewRef}>
                  <TextField
                    label='Contraseña'
                    style={styles.regularText}
                    labelTextStyle={styles.regularText}
                    error={!this.state.userPasswordValid ? 'La contraseña no puede ser tan corta' : ''}
                    value={userPassword}
                    secureTextEntry
                    onChangeText={this._handleChangeUserPassword}
                  />
                </Animatable.View>
                :
                null
            }

            <RegularText style={styles.forgotText} onPress={this._handleForgotPassword} >
              {
                userForgotPassword ?
                  'Tengo una cuenta'
                  :
                  'Olvidé mi contraseña'
              }
            </RegularText>
          </View>

          <View>
            <BCButton
              title={userForgotPassword ? 'Recupera Contraseña' : 'Entrar'}
              onPress={this._handleLogin}
              disabled={userForgotPassword ? !userMailValid : !formValid} />

            <RegularText style={styles.infoText}>
              ¿ Aún no tiene una cuenta ?
            <Text style={{ fontWeight: 'bold' }} onPress={() => Linking.openURL('http://banconfio.com')}>
                {` INFORMACIÓN`}
              </Text>
            </RegularText>

          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainLightGray,
    flex: 1,
  },
  titleText: {
    color: COLORS.mainBlue,
    fontSize: 35,
  },
  regularText: {
    fontFamily: 'Rajdhani-Regular'
  },
  forgotText: {
    color: COLORS.mainBlue,
    textAlign: 'right',
    marginTop: '2%'
  },
  blueText: {
    color: COLORS.mainBlue,
  },
  infoText: {
    marginTop: '4%',
    textAlign: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.mainWhite,
    paddingBottom: '8%',
    paddingTop: '8%',
    width: '100%'
  },
  logoImage: {
    marginBottom: '4%',
    marginTop: '4%',
    height: 100,
    width: 140,
  },
  formContainer: {
    backgroundColor: '#fff',
    marginBottom: '4%',
    paddingBottom: '4%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '2%',
    width: '100%'
  }
});