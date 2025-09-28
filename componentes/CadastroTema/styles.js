import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { commonStyles } from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
  },
  content: {
    ...commonStyles.container,
  },
  title: {
    ...commonStyles.title,
  },
  label: {
    ...commonStyles.inputLabel,
  },
  input: {
    ...commonStyles.input,
  },
  button: {
    ...commonStyles.button,
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  secondaryButton: {
    ...commonStyles.button,
    ...commonStyles.secondaryButton,
    marginTop: theme.spacing.md,
  },
  secondaryButtonText: {
    ...commonStyles.buttonText,
    ...commonStyles.secondaryButtonText,
  },
});

export default styles;