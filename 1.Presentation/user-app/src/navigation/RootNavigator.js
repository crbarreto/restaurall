/* 
  * Navigator
  * @flow
*/

// Node Modules
import { StackNavigator, DrawerNavigator, SwitchNavigator } from 'react-navigation';

// Screens:
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import NewUserScreen from '../screens/NewUser/NewUserScreen';
import CreditHistoryScreen from '../screens/CreditHistory/CreditHistoryScreen';

// Login and forgot password screen
import LoginScreen from '../screens/LoginScreen';

// Navigator menu
import { BCNavigationMenu } from '../components/BCNavigationMenu';

// Navigators
const Auth = StackNavigator({ Login: LoginScreen });
const App = DrawerNavigator(
  //Screens
  {
    Home: HomeScreen,
    NewUser: NewUserScreen,
    CreditHistory: CreditHistoryScreen,
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
