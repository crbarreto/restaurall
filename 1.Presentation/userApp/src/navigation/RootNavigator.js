/*
  * Navigator
  * @flow
*/

// Node Modules
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

// Screens:
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';

// Login and forgot password screen
import LoginScreen from '../screens/LoginScreen';

// Navigator menu
import { NavigationMenu } from '../components/Components';

// Navigators
const Auth = createStackNavigator({ Login: {screen: LoginScreen} });
const App = createDrawerNavigator(
    //Screens
    {
        Home: {screen: HomeScreen},
    },
    // Navigator Menu
    { contentComponent: NavigationMenu }
);

const RootNavigator = createSwitchNavigator(
    {
        AuthLoading: {screen: AuthLoadingScreen},
        Auth: {screen: Auth},
        App: {screen: App},
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default RootNavigator;
