/* 
  * Home Screen
  * @flow
 */

// Node modules
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

// Assets
const walletIcon = require('../assets/images/icons/wallet.png');
const moneyIcon = require('../assets/images/icons/money.png');
const documentIcon = require('../assets/images/icons/document.png');

// Components
import { MonoText, BoldText, RegularText, LightText } from '../components/StyledText';
import { BCHeader } from '../components/BCHeader';

// Constants
import COLORS from '../constants/Colors';

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Pantalla principal',
    drawerIcon: 'home'
  };

  render() {
    return (
      <View style={styles.container}>

        <BCHeader navigation={this.props.navigation} />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <RegularText style={styles.mainText}>
            Bienvenido señor
            <BoldText style={styles.mainText}> Cristian Barreto</BoldText>
            , aquí el estado de su cuenta:
            </RegularText>
          </View>
          <LinearGradient colors={COLORS.gradientWhite} style={styles.cardContainer} >
            <Image source={walletIcon} alt="Wallet" style={styles.cardIcon} />
            <View style={styles.infoContainer}>
              <LightText>Marzo de 2018</LightText>
              <BoldText style={styles.ammountText}>$ 965.000 COP</BoldText>
              <RegularText style={styles.ammountDescription} >Monto aprobado</RegularText>
            </View>
          </LinearGradient>

          <LinearGradient colors={COLORS.gradientWhite} style={styles.cardContainer} >
            <View style={styles.infoContainer}>
              <LightText>14 de Abril del 2018</LightText>
              <BoldText style={styles.ammountText}>$ 250.000 COP</BoldText>
              <RegularText style={styles.ammountDescription} >Último pago realizado</RegularText>
            </View>
            <Image source={moneyIcon} alt="Wallet" style={styles.cardIcon} />
          </LinearGradient>

          <LinearGradient colors={COLORS.gradientWhite} style={styles.cardContainer} >
            <Image source={documentIcon} alt="Wallet" style={styles.cardIcon} />
            <View style={styles.infoContainer}>
              <LightText>Fecha limite de pago</LightText>
              <BoldText style={styles.ammountText}>Junio 22 del 2018</BoldText>
              <RegularText style={styles.ammountDescription} >Factura actual</RegularText>
            </View>
          </LinearGradient>

          <View style={[styles.welcomeContainer, { alignItems: 'center', marginVertical: '4%' }]}>
            <LightText style={styles.mainText}>Estado de su cŕedito</LightText>
            <LinearGradient colors={COLORS.gradientWhite} style={styles.creditStatus} >
              <BoldText style={{ color: COLORS.mainBlue, fontSize: 24 }}>Desembolsado</BoldText>
            </LinearGradient>
            <RegularText style={styles.mainText}>Total a pagar: $276.000 COP</RegularText>
          </View>


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: '4%',
  },
  welcomeContainer: {
    marginHorizontal: '10%',
    marginVertical: '2%',
    width: '80%'
  },
  mainText: {
    color: '#000',
    fontSize: 20
  },
  cardContainer: {
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '10%',
    marginVertical: '2%',
    paddingVertical: '10%',
    paddingHorizontal: '8%',
    width: '80%'
  },
  cardIcon: {
    marginHorizontal: '8%',
    height: 60,
    width: 60,
  },
  infoContainer: {
    paddingVertical: '4%'
  },
  ammountText: {
    color: COLORS.mainBlue,
    fontSize: 25,
  },
  ammountDescription: {
    color: COLORS.mainLightBlue,
    fontSize: 18,
  },
  creditStatus: {
    borderRadius: 15,
    marginVertical: '1%',
    paddingVertical: '6%',
    paddingHorizontal: '6%'
  }
});
