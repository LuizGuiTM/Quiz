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
  infoText: {
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
    ...theme.typography.body,
    fontWeight: '500',
  },
  picker: {
    ...commonStyles.picker,
  },
  input: {
    ...commonStyles.input,
  },
  button: {
    ...commonStyles.button,
    marginTop: theme.spacing.xl,
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