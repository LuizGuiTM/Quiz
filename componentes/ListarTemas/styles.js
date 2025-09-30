import { StyleSheet } from 'react-native';
import theme from '../../theme';
import { commonStyles } from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h2,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  listTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  listSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: theme.spacing.md,
  },
  actionButton: {
    ...commonStyles.button,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.borderRadius.sm,
  },
  actionText: {
    ...commonStyles.buttonText,
    fontSize: 14,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

export default styles;