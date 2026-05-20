/**
 * COMPONENTE: TARJETA (CARD)
 * 
 * Componente de tarjeta reutilizable para mostrar contenido agrupado.
 * Incluye sombras y estilos consistentes.
 * 
 * Props:
 * - children: contenido de la tarjeta
 * - style: estilos personalizados adicionales
 */

import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SIZES } from '../../../constants';

const Card = ({ children, style }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[{ 
      backgroundColor: colors.surface,
      borderRadius: SIZES.borderRadius.lg,
      padding: SIZES.padding.lg,
      marginBottom: SIZES.padding.md,
      borderWidth: SIZES.borderWidth.thin,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 4,
    }, style]}>
      {children}
    </View>
  );
};

export default Card;
