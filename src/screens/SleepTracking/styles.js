/**
 * ESTILOS: SleepTrackingScreen
 * 
 * Estilos de la pantalla de seguimiento de sueño.
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
    padding: SIZES.padding.lg,
  },
  
  title: {
    fontSize: SIZES.font.heading,
    fontWeight: '800',
    color: colors.text,
    marginBottom: SIZES.padding.lg,
    marginTop: SIZES.padding.md,
  },
  
  label: {
    fontSize: SIZES.font.xSmall,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: SIZES.padding.sm,
    marginTop: SIZES.padding.md,
  },
  
  timePickerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding.md,
  },
  
  timePickerContent: {
    flex: 1,
  },
  
  timeLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.xs,
  },
  
  timeValue: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
  },
  
  timeButtons: {
    flexDirection: 'row',
    gap: SIZES.padding.sm,
  },
  
  timeButton: {
    width: SIZES.button.medium.height,
    height: SIZES.button.medium.height,
    borderRadius: SIZES.borderRadius.lg,
    backgroundColor: colors.surfaceElevated || colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SIZES.borderWidth.thin,
    borderColor: colors.border,
  },
  
  totalCard: {
    backgroundColor: colors.secondaryLight,
    borderColor: colors.secondary,
  },
  
  totalLabel: {
    fontSize: SIZES.font.small,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: SIZES.padding.xs,
  },
  
  totalSubLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.sm,
  },
  
  totalValue: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  qualityContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.md,
  },
  
  qualityLabel: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    marginBottom: SIZES.padding.md,
  },
  
  starsContainer: {
    flexDirection: 'row',
    gap: SIZES.padding.sm,
    marginBottom: SIZES.padding.sm,
  },
  
  starButton: {
    padding: SIZES.padding.xs,
  },
  
  qualityValue: {
    fontSize: SIZES.font.regular,
    color: colors.primary,
    fontWeight: '600',
    marginTop: SIZES.padding.xs,
  },
  
  sectionTitle: {
    fontSize: SIZES.font.xLarge,
    fontWeight: '800',
    color: colors.text,
    marginTop: SIZES.padding.xl,
    marginBottom: SIZES.padding.md,
  },
  
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  recordDate: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    fontWeight: '500',
    marginBottom: SIZES.padding.xs,
  },

  recordQuality: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
  },
  
  recordHours: {
    fontSize: SIZES.font.large,
    color: colors.primary,
    fontWeight: 'bold',
  },

  emptyRecords: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.md,
  },

  emptyRecordsText: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginTop: SIZES.padding.sm,
    textAlign: 'center',
  },

  datePickerCard: {
    flexDirection: 'column',
    paddingVertical: SIZES.padding.lg,
  },

  datePickerContent: {
    alignItems: 'center',
    marginBottom: SIZES.padding.xl,
  },

  dateLabel: {
    fontSize: SIZES.font.xSmall,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.sm,
    fontWeight: '600',
    letterSpacing: 1,
  },

  dateValue: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.secondary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  dateButtonsContainer: {
    alignItems: 'center',
  },

  dateNavigationButtons: {
    flexDirection: 'row',
    gap: SIZES.padding.md,
    alignItems: 'center',
  },

  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: SIZES.padding.md,
    paddingHorizontal: SIZES.padding.lg,
    borderRadius: SIZES.borderRadius.lg,
    gap: SIZES.padding.xs,
  },

  dateButtonText: {
    fontSize: SIZES.font.regular,
    color: colors.textLight,
    fontWeight: '600',
  },

  warningCard: {
    backgroundColor: colors.warning + '20',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    padding: SIZES.padding.md,
    marginBottom: SIZES.padding.md,
    borderRadius: SIZES.borderRadius.md,
  },

  warningText: {
    fontSize: SIZES.font.small,
    color: colors.text,
    lineHeight: 20,
  },
});

export default createStyles;
