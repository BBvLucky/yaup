import React from 'react';
import {observer, inject} from 'mobx-react';
import {SafeAreaView, Button, Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

import TestModule from '../TestModule';

@inject('ApplicationStore')
@observer
class Application extends React.Component {
  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    const {
      ApplicationStore: {setUserData, user},
      navigation: {navigate},
    } = this.props;

    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('before set data');
        setUserData(credentials, true);
        console.log('after set data: ', user);
        if (user.isAuthorized) {
          navigate('auth');
        }
      } else {
        navigate('unauth');
      }
    } catch (error) {
      Alert.alert('', 'Ошибка запроса пользователя');
    }
  };

  render() {
    return (
      <SafeAreaView>
        <TestModule />
        <Button
          title="go to login"
          onPress={() => this.props.navigation.navigate('unauth')}
        />
        <Button
          title="go to app"
          onPress={() => this.props.navigation.navigate('auth')}
        />
      </SafeAreaView>
    );
  }
}

export default Application;
