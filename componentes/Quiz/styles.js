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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loading: {
    ...theme.typography.title,
    color: theme.colors.text.secondary,
  },
  title: {
    ...commonStyles.title,
  },
  progressContainer: {
    marginBottom: theme.spacing.lg,
  },
  progressText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.background,
    borderRadius: theme.shape.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  pergunta: {
    ...theme.typography.subtitle,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.l,
  },
  alternativasContainer: {
    marginTop: theme.spacing.md,
  },
  alternativa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.shape.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  alternativaLetra: {
    ...theme.typography.subtitle,
    color: theme.colors.primary,
    marginRight: theme.spacing.md,
    width: 24,
    textAlign: 'center',
  },
  alternativaTexto: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  // Resumo styles
  scoreCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  scoreLabel: {
    ...theme.typography.subtitle,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  scoreValue: {
    ...theme.typography.display,
    marginVertical: theme.spacing.sm,
  },
  scoreHigh: {
    color: theme.colors.success,
  },
  scoreMedium: {
    color: theme.colors.warning,
  },
  scoreLow: {
    color: theme.colors.error,
  },
  scoreDetail: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  resumoItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.shape.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  perguntaResumo: {
    ...theme.typography.subtitle,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  respostaContainer: {
    marginBottom: theme.spacing.m,
  },
  respostaLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  respostaTexto: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  statusBadge: {
    borderRadius: theme.shape.borderRadius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  statusAcerto: {
    backgroundColor: theme.colors.success + '20',
  },
  statusErro: {
    backgroundColor: theme.colors.error + '20',
  },
  statusText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
  },
  button: {
    ...commonStyles.button,
    marginTop: theme.spacing.xl,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
});

export default styles;