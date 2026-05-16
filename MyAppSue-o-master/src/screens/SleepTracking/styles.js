/**
 * ESTILOS: SleepTrackingScreen
 * 
 * Estilos de la pantalla de seguimiento de sueño.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  container: {
    flex: 1,
    padding: SIZES.padding.lg,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding.lg,
    marginTop: SIZES.padding.md,
  },
  
  label: {
    fontSize: SIZES.font.xSmall,
    fontWeight: '600',
    color: COLORS.textSecondary,
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
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding.xs,
  },
  
  timeValue: {
    fontSize: SIZES.font.xxxLarge * 1.2,
    fontWeight: '300',
    color: COLORS.primary,
  },
  
  timeButtons: {
    flexDirection: 'row',
    gap: SIZES.padding.sm,
  },
  
  timeButton: {
    width: SIZES.button.medium.height,
    height: SIZES.button.medium.height,
    borderRadius: SIZES.borderRadius.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: SIZES.borderWidth.thin,
    borderColor: COLORS.border,
  },
  
  totalCard: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.3,
  },
  
  totalLabel: {
    fontSize: SIZES.font.small,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: SIZES.padding.xs,
  },
  
  totalSubLabel: {
    fontSize: SIZES.font.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding.sm,
  },
  
  totalValue: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  
  qualityContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.md,
  },
  
  qualityLabel: {
    fontSize: SIZES.font.regular,
    color: COLORS.text,
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
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: SIZES.padding.xs,
  },
  
  sectionTitle: {
    fontSize: SIZES.font.xLarge,
    fontWeight: '600',
    color: COLORS.text,
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
    color: COLORS.text,
    fontWeight: '500',
  },
  
  recordHours: {
    fontSize: SIZES.font.large,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default styles;
