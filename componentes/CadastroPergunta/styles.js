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
    marginTop: theme.spacing.md,
  },
  picker: {
    ...commonStyles.picker,
    height: 50,
  },
  input: {
    ...commonStyles.input,
  },
  altContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  borderRadius: theme.shape.borderRadius.md,
    ...theme.shadows.sm,
  },
  altInput: {
    ...commonStyles.input,
    flex: 1,
    marginBottom: 0,
    marginRight: theme.spacing.md,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
  borderRadius: theme.shape.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  radioLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
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