import {createStackNavigator} from 'react-navigation-stack';

import tabs from './tabs/tabs';
import {DialogScreen, TodoListScreen} from '../modules';
import {colors} from '../theme';

const authRoute = createStackNavigator(
  {
    main: {
      screen: tabs,
      navigationOptions: {
        header: null,
      },
    },
    dialog: DialogScreen,
    todo: TodoListScreen,
  },
  {
    initialRouteName: 'main',
    mode: 'modal',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    },
  },
);

export default authRoute;
