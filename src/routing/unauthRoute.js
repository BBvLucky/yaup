import {createStackNavigator} from 'react-navigation-stack';

import {Login} from '../modules';

const unauthRoute = createStackNavigator(
  {
    login: Login,
  },
  {
    initialRouteName: 'login',
    mode: 'modal',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default unauthRoute;
