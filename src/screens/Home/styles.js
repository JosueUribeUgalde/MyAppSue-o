/**
 * ESTILOS: HomeScreen
 * 
 * Estilos específicos de la pantalla de inicio.
 * Separados del componente para mejor mantenimiento.
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
  
  lastNightCard: {
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  lastNightTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: SIZES.padding.md,
  },
  
  lastNightContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  lastNightLeft: {
    flex: 1,
  },
  
  lastNightLabel: {
    fontSize: SIZES.font.regular,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: SIZES.padding.xs,
  },
  
  lastNightValue: {
    fontSize: SIZES.font.xxxLarge * 1.5,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: SIZES.padding.md,
  },
  
  lastNightTimes: {
    flexDirection: 'row',
    gap: SIZES.padding.lg,
  },
  
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.padding.xs,
  },
  
  timeText: {
    fontSize: SIZES.font.regular,
    color: colors.textLight,
    fontWeight: '500',
  },
  
  lastNightRight: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.padding.lg,
  },
  
  cardTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.text,
  },
  
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding.md,
  },
  
  cardTitleIcon: {
    marginRight: SIZES.padding.sm,
  },
  
  cardText: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.xs,
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZES.padding.sm,
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statValue: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: colors.primary,
  },
  
  statLabel: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginTop: SIZES.padding.xs,
  },
  
  statBox: {
    backgroundColor: colors.background,
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.lg,
    flex: 1,
    marginHorizontal: SIZES.padding.xs,
    alignItems: 'center',
  },
  
  statBoxLabel: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
    marginBottom: SIZES.padding.xl,
  },
  
  statBoxValue: {
    fontSize: SIZES.font.xxLarge,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  
  buttonContainer: {
    marginVertical: SIZES.padding.xl,
  },
  
  actionBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding.xl,
    gap: SIZES.padding.md,
  },
  
  actionBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  actionBoxText: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
    marginTop: SIZES.padding.sm,
    textAlign: 'center',
  },

  emptyStateCard: {
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 160,
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

  loadingCard: {
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    minHeight: 160,
  },
});

export default createStyles;
