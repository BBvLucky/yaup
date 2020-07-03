import React from 'react';
import {Text, TextInput, FlatList, View, TouchableOpacity} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import uuid from 'uuid/v4';
import Icon from 'react-native-vector-icons/Entypo';
import {observer, inject} from 'mobx-react';

import realm, {
  // getMessagesFromDialogList,
  // queryAllMessages,
  messagesInDialogList,
  updateDialogList,
  deleteMessage,
} from '../../../../database/mainSchema';

import styles from './DialogStyles';

@inject('ApplicationStore')
@observer
class Dialog extends React.PureComponent {
  state = {
    message: '',
    messages: [],
  };

  list = React.createRef();

  static navigationOptions = ({navigation}) => {
    const {friendsName} = navigation.getParam('dialogInfo');
    return {
      title: friendsName,
    };
  };

  componentDidMount() {
    this.reloadData();
    this.didFocus = this.props.navigation.addListener('didFocus', () =>
      realm.addListener('change', this.reloadData),
    );
    this.willBlur = this.props.navigation.addListener('willBlur', () => {
      realm.removeAllListeners();
    });
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
  }

  reloadData = () => {
    const {
      navigation: {getParam},
      ApplicationStore: {user},
    } = this.props;
    const {id} = getParam('dialogInfo');

    // getMessagesFromDialogList(user.userName, id).then(messages =>
    //   this.setState({messages}, () => this.list.current.scrollToEnd()),
    // );

    const messages = user.dialogs.find(item => item.id === id);
    this.setState({messages});
    // return messages;
  };

  dialogImitation = id => {
    const {
      navigation,
      ApplicationStore: {user},
    } = this.props;
    const {message} = this.state;
    const {friendsName} = navigation.getParam('dialogInfo');

    messagesInDialogList(user.userName, id, {
      id: uuid(),
      userName: user.userName,
      message,
    });
    updateDialogList(user.userName, {
      id,
      lastMessage: message,
    });
    this.setState({message: ''});

    setTimeout(() => {
      messagesInDialogList(user.userName, id, {
        id: uuid(),
        userName: friendsName,
        message,
        isMine: false,
      });
    }, 1000);
  };

  renderMessageInput = () => {
    const {message} = this.state;
    const {
      navigation: {getParam},
    } = this.props;
    const {id} = getParam('dialogInfo');

    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          placeholder="Type message here"
          onChangeText={value => this.setState({message: value})}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => this.dialogImitation(id)}>
          <Icon
            name="paper-plane"
            size={25}
            style={styles.sendIcon}
            color={styles.sendIcon.color}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderMessages = info => {
    const {
      item: {userName, message, isMine},
    } = info;
    const {
      navigation: {getParam},
    } = this.props;
    const {id} = getParam('dialogInfo');

    return (
      <TouchableOpacity onPress={() => deleteMessage(id, info.item.id)}>
        <View
          style={
            isMine
              ? styles.messageContainerOutcome
              : styles.messageContainerIncome
          }>
          <View
            style={[isMine ? styles.outcome : styles.income, styles.message]}>
            <Text
              style={isMine ? styles.userNameOutcome : styles.userNameIncome}>
              {userName}
            </Text>
            <Text style={isMine ? styles.textOutcome : null}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  testFunc = () => {
    const didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        console.debug('didBlur', payload);
      },
    );
    return didBlurSubscription;
  };

  render() {
    // const {messages} = this.reloadData();
    // this.testFunc();
    const {messages} = this.state.messages;

    return (
      <View style={styles.container}>
        <FlatList
          ref={this.list}
          // inverted
          data={messages}
          renderItem={this.renderMessages}
          keyExtractor={item => item.id}
        />
        {this.renderMessageInput()}
      </View>
    );
  }
}

export default withNavigationFocus(Dialog);
