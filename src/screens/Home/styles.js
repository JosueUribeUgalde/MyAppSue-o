/**
 * ESTILOS: HomeScreen
 */

import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

const createStyles = (colors) => StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding.lg,
    paddingTop: SIZES.padding.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.padding.sm,
    marginBottom: SIZES.padding.xl,
  },

  title: {
    fontSize: SIZES.font.xxLarge,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },

  subtitle: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: SIZES.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
  },

  lastNightCard: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.borderRadius.xl,
    padding: SIZES.padding.lg,
    marginBottom: SIZES.padding.lg,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 6,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyebrow: {
    fontSize: SIZES.font.small,
    color: colors.primary,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  sleepSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.padding.md,
  },

  sleepMainColumn: {
    flex: 1,
  },

  lastNightValue: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    color: colors.text,
  },

  lastNightLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    fontWeight: '700',
    marginTop: SIZES.padding.xs,
  },

  qualityRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated || colors.surface,
  },

  qualityPercent: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    fontWeight: '900',
  },

  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.padding.md,
    marginTop: SIZES.padding.xl,
  },

  metricItem: {
    flex: 1,
  },

  metricLabel: {
    fontSize: SIZES.font.xSmall,
    color: colors.textSecondary,
    fontWeight: '700',
    marginTop: SIZES.padding.xs,
  },

  metricValue: {
    fontSize: SIZES.font.small,
    color: colors.text,
    fontWeight: '900',
    marginTop: 3,
  },

  aiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: SIZES.borderRadius.xl,
    padding: SIZES.padding.lg,
    marginBottom: SIZES.padding.lg,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },

  aiIcon: {
    width: 44,
    height: 44,
    borderRadius: SIZES.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    marginRight: SIZES.padding.md,
  },

  aiContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: SIZES.font.regular,
    fontWeight: '900',
    color: colors.text,
  },

  aiText: {
    fontSize: SIZES.font.small,
    lineHeight: 20,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: SIZES.padding.xs,
  },

  weeklyCard: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.borderRadius.xl,
    padding: SIZES.padding.lg,
    marginBottom: SIZES.padding.lg,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },

  weeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.md,
  },

  weeklyValue: {
    fontSize: SIZES.font.small,
    color: colors.primary,
    fontWeight: '900',
  },

  weeklyChart: {
    height: 114,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  weeklyBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  weeklyBarTrack: {
    width: 26,
    height: 86,
    borderRadius: SIZES.borderRadius.sm,
    overflow: 'hidden',
    backgroundColor: colors.border,
    justifyContent: 'flex-end',
  },

  weeklyBar: {
    width: '100%',
    borderTopLeftRadius: SIZES.borderRadius.sm,
    borderTopRightRadius: SIZES.borderRadius.sm,
  },

  weeklyBarLabel: {
    fontSize: SIZES.font.xSmall,
    color: colors.textSecondary,
    fontWeight: '800',
    marginTop: SIZES.padding.sm,
  },

  emptyStateCard: {
    borderRadius: SIZES.borderRadius.xl,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
    minHeight: 220,
  },

  emptyStateTitle: {
    fontSize: SIZES.font.xLarge,
    fontWeight: '800',
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

  loadingCard: {
    borderRadius: SIZES.borderRadius.xl,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
    minHeight: 220,
  },

  bottomSpacer: {
    height: SIZES.padding.xxxl,
  },
});

export default createStyles;
