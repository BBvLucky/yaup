import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Entypo';

import {HomeScreen, ProfileScreen, MessagesScreen} from '../../modules';
import {colors} from '../../theme';

const Home = createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Главная',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    },
  },
});

const Messages = createStackNavigator({
  messages: {
    screen: MessagesScreen,
    navigationOptions: {
      title: 'Диалоги',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    },
  },
});

const Profile = createStackNavigator({
  profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Профиль',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    },
  },
});

export default createMaterialBottomTabNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <React.Fragment>
            <Icon style={[{color: tintColor}]} size={25} name={'home'} />
          </React.Fragment>
        ),
      },
    },
    messages: {
      screen: Messages,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <React.Fragment>
            <Icon style={[{color: tintColor}]} size={25} name={'chat'} />
          </React.Fragment>
        ),
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <React.Fragment>
            <Icon style={[{color: tintColor}]} size={25} name={'user'} />
          </React.Fragment>
        ),
      },
    },
  },
  {
    initialRouteName: 'home',
    activeColor: colors.white,
    inactiveColor: colors.black,
    barStyle: {
      backgroundColor: colors.primary,
    },
    labeled: false,
  },
);
