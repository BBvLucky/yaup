import React from 'react';
import {SafeAreaView, Text, TextInput, Button, Alert} from 'react-native';
import {observer, inject} from 'mobx-react';
import * as Keychain from 'react-native-keychain';

import {checkUser, addUser, auth} from '../../database/mainSchema';

@inject('ApplicationStore')
@observer
class Login extends React.PureComponent {
  state = {
    login: '',
    isRegistered: [],
  };

  checkAndLogin = () => {
    const {login} = this.state;
    const {setUserData} = this.props.ApplicationStore;

    checkUser(login).then(isRegistered => {
      this.setState({isRegistered}, async () => {
        if (isRegistered.length) {
          await Keychain.setGenericPassword(login, '123');
          setUserData({username: login, password: '123'});
          auth(login);
          this.props.navigation.navigate('auth');
        } else {
          Alert.alert('', 'Пользователь не найден. Зарегистрировать?', [
            {
              text: 'нет',
            },
            {
              text: 'да',
              onPress: async () => {
                const data = {userName: login, password: '123', isAuthorized: true};
                await Keychain.setGenericPassword(login, '123');
                setUserData(data);
                addUser(data);
                this.props.navigation.navigate('auth');
              },
            },
          ]);
        }
      });
    });
  };

  render() {
    const {login} = this.state;
    return (
      <SafeAreaView>
        <Text>Вход</Text>
        <TextInput
          placeholder="имя пользователя"
          value={login}
          onChangeText={value => this.setState({login: value})}
        />
        <Button title="вход" onPress={this.checkAndLogin} />
      </SafeAreaView>
    );
  }
}

export default Login;
