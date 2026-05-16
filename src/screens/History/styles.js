/**
 * ESTILOS: HistoryScreen
 */

import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  content: {
    flex: 1,
    padding: SIZES.padding.lg,
  },
  
  header: {
    marginBottom: SIZES.padding.xl,
    marginTop: SIZES.padding.md,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.padding.xs,
  },
  
  subtitle: {
    fontSize: SIZES.font.large,
    color: colors.textSecondary,
  },
  
  cardTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.text,
    marginBottom: SIZES.padding.md,
  },
  
  cardText: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
  },

  recordCard: {
    marginBottom: SIZES.padding.md,
  },

  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.md,
  },

  recordDate: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.text,
  },

  deleteButton: {
    padding: SIZES.padding.xs,
  },

  recordInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding.sm,
  },

  recordInfoLeft: {
    flex: 1,
  },

  recordInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.xs,
  },

  recordLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginLeft: SIZES.padding.xs,
  },

  recordValue: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    fontWeight: '500',
    marginLeft: SIZES.padding.xs,
  },

  recordQuality: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: SIZES.padding.md,
    paddingVertical: SIZES.padding.sm,
    borderRadius: SIZES.borderRadius.md,
  },

  recordQualityEmoji: {
    fontSize: 28,
    marginRight: SIZES.padding.xs,
  },

  recordQualityText: {
    fontSize: SIZES.font.small,
    color: colors.primary,
    fontWeight: '600',
  },

  recordNotes: {
    marginTop: SIZES.padding.sm,
    paddingTop: SIZES.padding.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  recordNotesLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.xs,
    fontWeight: '600',
  },

  recordNotesText: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    lineHeight: 20,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.xxl,
    backgroundColor: colors.surface,
    borderRadius: SIZES.borderRadius.lg,
  },

  emptyStateTitle: {
    fontSize: SIZES.font.xLarge,
    fontWeight: '600',
    color: colors.text,
    marginTop: SIZES.padding.md,
    marginBottom: SIZES.padding.xs,
  },

  emptyStateText: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.xxl,
  },

  monthDivider: {
    fontSize: SIZES.font.regular,
    fontWeight: '600',
    color: colors.primary,
    marginTop: SIZES.padding.lg,
    marginBottom: SIZES.padding.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  recordsCount: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.md,
    textAlign: 'center',
  },
});

export default createStyles;
