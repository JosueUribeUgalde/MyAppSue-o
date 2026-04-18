/**
 * ESTILOS: SleepTrackingScreen
 * 
 * Estilos de la pantalla de seguimiento de sueño.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.lg,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding.lg,
    marginTop: SIZES.padding.md,
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
