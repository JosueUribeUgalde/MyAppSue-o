/**
 * ESTILOS DE LA TARJETA (CARD)
 * 
 * Estilos para el componente Card con sombras y bordes.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.lg,
    marginBottom: SIZES.padding.md,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default styles;
