import {StyleSheet} from 'react-native';
import {colors} from '../../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    width: '70%',
  },
  messageContainerIncome: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  messageContainerOutcome: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  income: {
    backgroundColor: colors.primaryLight,
    borderTopLeftRadius: 0,
    // position: 'absolute',
    // left: 40,
  },
  outcome: {
    backgroundColor: colors.secondary,
    borderTopRightRadius: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    paddingTop: 13,
    paddingBottom: 55,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  sendIcon: {
    marginHorizontal: 10,
    color: colors.white,
  },
  userNameOutcome: {
    textAlign: 'right',
    color: colors.white,
    fontWeight: 'bold',
  },
  userNameIncome: {
    fontWeight: 'bold',
  },
  textOutcome: {
    color: colors.white,
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  incomeAvatar: {
    position: 'absolute',
    left: 0,
  },
});
