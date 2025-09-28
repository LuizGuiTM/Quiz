import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { commonStyles } from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl * 1.5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  button: {
    ...commonStyles.button,
    marginBottom: theme.spacing.lg,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
});

export default styles;