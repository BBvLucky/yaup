import React from 'react';
import {Button, FlatList} from 'react-native';
import {observer, inject} from 'mobx-react';
import uuid from 'uuid/v4';
import {withNavigationFocus} from 'react-navigation';

import {DialogList} from '../../components';

import realm, {
  createNewDialogList,
  queryAllMessages,
  deleteDialogList,
} from '../../../../database/mainSchema';

@inject('ApplicationStore')
@observer
class Messages extends React.PureComponent {
  state = {
    dialogs: [],
  };

  componentDidMount() {
    this.reloadData();
    this.didFocus = this.props.navigation.addListener('didFocus', () =>
      realm.addListener('change', this.reloadData),
    );
    this.willBlur = this.props.navigation.addListener('willBlur', () =>
      realm.removeAllListeners(),
    );
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
  }

  reloadData = () => {
    const {user, setUserDialogs} = this.props.ApplicationStore;

    queryAllMessages(user.userName)
      // .then(dialogList => this.setState({dialogList}))
      .then(dialogs => setUserDialogs(dialogs))
      .catch(e => console.log(e, ' - error'));
  };

  startNewDialog = () => {
    const {
      user: {userName},
    } = this.props.ApplicationStore;

    const newDialog = {
      id: uuid(),
      userName: 'Thomas',
      lastMessage: 'no messages',
    };
    createNewDialogList(userName, newDialog);
  };

  renderDialogList = info => {
    const {
      navigation: {navigate},
      ApplicationStore: {
        user: {userName},
      },
    } = this.props;

    return (
      <DialogList
        userName={info.item.userName}
        lastMessage={info.item.lastMessage}
        onLongPress={() => deleteDialogList(userName, info.item.id)}
        onPress={() =>
          navigate('dialog', {
            dialogInfo: {id: info.item.id, friendsName: info.item.userName},
          })
        }
      />
    );
  };

  render() {
    const {
      user: {dialogs},
    } = this.props.ApplicationStore;
    // const {dialogs} = this.state;
    return (
      <FlatList
        data={dialogs}
        renderItem={this.renderDialogList}
        ListHeaderComponent={() => (
          <Button title="start new dialog" onPress={this.startNewDialog} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default withNavigationFocus(Messages);
