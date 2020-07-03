import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const DialogList = ({onPress, userName, lastMessage, onLongPress}) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
    <View>
      <Icon name="user" size={25} />
      <Text>{userName}</Text>
    </View>
    <Text>{lastMessage}</Text>
  </TouchableOpacity>
);

export default DialogList;
