import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {getWindowWidth, imageAutoHeigth} from '../../utils';

import styles from './CardStyles';


const Card = ({price, title, image, onPress}) => {
  const width = getWindowWidth();
  const height = imageAutoHeigth(width, image);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={{width, height}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
      </View>
    </TouchableOpacity>
)};

export default Card;
