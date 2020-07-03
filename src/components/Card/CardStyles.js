import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

import {getWindowWidth, imageAutoHeigth} from '../../utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    elevation: 5,
    shadowRadius: 5,
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    shadowColor: colors.grayDark,
    overflow: 'hidden',
    backgroundColor: colors.gray,
  },
  image: {
    width: '100%',
    height: 192,
    // flex: 1,
    // alignSelf: 'stretch',
  },
  textContainer: {
    backgroundColor: colors.gray,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'right',
  },
});
