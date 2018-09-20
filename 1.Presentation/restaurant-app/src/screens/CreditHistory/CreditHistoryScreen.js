/**
 * Credit History Screen
 * @flow
 */

// Node modules
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// Components
import { RegularText } from '../../components/StyledText';
import { BCHeader } from '../../components/bc-components';

// Constants
import COLORS from '../../constants/Colors';

type Props = {};
export default class CreditHistoryScreen extends Component<Props> {
    static navigationOptions = {
        drawerLabel: 'Historial crediticio',
        drawerIcon: 'credit-card'
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <BCHeader navigation={this.props.navigation} />
                    <RegularText>Historial Crediticio</RegularText>

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
});