/**
 * ESTILOS GLOBALES
 * 
 * Estilos compartidos en toda la aplicación.
 * Incluye contenedores, tipografía y utilidades comunes.
 * Uso: import { globalStyles } from '@/styles/globalStyles';
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

export const globalStyles = StyleSheet.create({
  // Contenedores
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  containerPadded: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.lg,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  
  // Tarjetas
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.lg,
    marginBottom: SIZES.padding.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Tipografía
  title: {
    fontSize: SIZES.font.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding.md,
  },
  
  heading: {
    fontSize: SIZES.font.heading,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding.sm,
  },
  
  subheading: {
    fontSize: SIZES.font.large,
    fontWeight: '500',
    color: COLORS.text,
  },
  
  bodyText: {
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    lineHeight: 22,
  },
  
  caption: {
    fontSize: SIZES.font.small,
    color: COLORS.textSecondary,
  },
  
  // Utilidades
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  shadow: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  divider: {
    height: SIZES.borderWidth.thin,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.padding.md,
  },
});
