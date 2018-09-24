/* 
  * Navigator
  * @flow
*/

// Node Modules
import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

// Screens:
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';

// Login and forgot password screen
import LoginScreen from '../screens/LoginScreen';

// Navigator menu
import NavigationMenu from '../components/NavigationMenu';

// Navigators
const Auth = StackNavigator({ Login: LoginScreen });
const App = DrawerNavigator(
    //Screens
    {
        Home: HomeScreen,
    },
    // Navigator Menu
    { contentComponent: BCNavigationMenu }
);

const RootNavigator = SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: Auth,
        App: App,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default RootNavigator;
