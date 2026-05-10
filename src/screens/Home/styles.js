/**
 * ESTILOS: HomeScreen
 * 
 * Estilos específicos de la pantalla de inicio.
 * Separados del componente para mejor mantenimiento.
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
  
  header: {
    marginBottom: SIZES.padding.xl,
    marginTop: SIZES.padding.md,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding.xs,
  },
  
  subtitle: {
    fontSize: SIZES.font.large,
    color: COLORS.textSecondary,
  },
  
  lastNightCard: {
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    marginBottom: SIZES.padding.lg,
    shadowColor: COLORS.shadow,
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
    color: COLORS.textLight,
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
    color: COLORS.textLight,
    opacity: 0.9,
    marginBottom: SIZES.padding.xs,
  },
  
  lastNightValue: {
    fontSize: SIZES.font.xxxLarge * 1.5,
    fontWeight: 'bold',
    color: COLORS.textLight,
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
    color: COLORS.textLight,
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
    color: COLORS.text,
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
    color: COLORS.textSecondary,
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
    color: COLORS.primary,
  },
  
  statLabel: {
    fontSize: SIZES.font.small,
    color: COLORS.textSecondary,
    marginTop: SIZES.padding.xs,
  },
  
  statBox: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.lg,
    flex: 1,
    marginHorizontal: SIZES.padding.xs,
    alignItems: 'center',
  },
  
  statBoxLabel: {
    fontSize: SIZES.font.regular,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding.xl,
  },
  
  statBoxValue: {
    fontSize: SIZES.font.xxLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
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
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
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
    color: COLORS.textSecondary,
    marginTop: SIZES.padding.sm,
    textAlign: 'center',
  },
});

export default styles;
