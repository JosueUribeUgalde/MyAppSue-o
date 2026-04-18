/**
 * ESTILOS: HomeScreen
 * 
 * Estilos específicos de la pantalla de inicio.
 * Separados del componente para mejor mantenimiento.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  
  cardTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding.md,
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
  
  buttonContainer: {
    marginVertical: SIZES.padding.xl,
  },
});

export default styles;
