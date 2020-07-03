import React from 'react';
import {Text, Button, Alert} from 'react-native';
import {observer, inject} from 'mobx-react';
import * as Keychain from 'react-native-keychain';

import {unAuth} from '../../database/mainSchema';

@inject('ApplicationStore')
@observer
class Profile extends React.PureComponent {
  logout = userName => {
    Alert.alert('', 'Вы уверены, что хотите выйти?', [
      {text: 'отмена'},
      {
        text: 'да',
        onPress: async () => {
          await Keychain.resetGenericPassword();
          unAuth(userName);
          this.props.navigation.navigate('unauth');
        },
      },
    ]);
  };

  render() {
    const {userName} = this.props.ApplicationStore.user;
    return (
      <React.Fragment>
        <Text>Профиль</Text>
        <Text>Привет, {userName}!</Text>
        <Button title="выход" onPress={() => this.logout(userName)} />
      </React.Fragment>
    );
  }
}

export default Profile;
