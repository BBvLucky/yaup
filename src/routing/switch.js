import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import authRoute from './authRoute';
import unauthRoute from './unauthRoute';
import {Application} from '../modules';
import App from '../App';

export default createAppContainer(
  createSwitchNavigator(
    {
      auth: authRoute,
      unauth: unauthRoute,
      // app: App,
      application: Application,
    },
    {
      initialRouteName: 'application',
    },
  ),
);
