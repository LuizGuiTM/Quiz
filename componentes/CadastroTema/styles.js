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
  lista: {
    width: '100%',
    marginTop: theme.spacing.md,
  },
  temaItem: {
    ...commonStyles.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  temaNome: {
    ...commonStyles.text,
    flex: 1,
  },
  temaButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: theme.colors.warning,
    padding: theme.spacing.sm,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.sm,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.shape.borderRadius,
  },
  editButtonText: {
    color: theme.colors.text.onPrimary,
    fontSize: 14,
  },
  deleteButtonText: {
    color: theme.colors.text.onPrimary,
    fontSize: 14,
  },
  modalView: {
    ...commonStyles.card,
    margin: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: theme.colors.surface,
  },
  modalTitle: {
    ...commonStyles.title,
    marginBottom: theme.spacing.lg,
  },
  modalInput: {
    ...commonStyles.input,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  modalButton: {
    flex: 1,
    margin: theme.spacing.xs,
    padding: theme.spacing.sm,
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
  },
  saveButton: {
    backgroundColor: theme.colors.success,
  },
  modalButtonText: {
    color: theme.colors.text.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;