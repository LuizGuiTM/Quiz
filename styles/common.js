import { StyleSheet } from 'react-native';
import theme from '../theme';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.shape.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
  },
  inputLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius.full,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  buttonText: {
    color: theme.colors.text.onPrimary,
    ...theme.typography.button,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  picker: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.shape.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  error: {
    color: theme.colors.error,
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
  success: {
    color: theme.colors.success,
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
});

export default commonStyles;