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
      borderRadius: SIZES.borderRadius.medium,
      padding: SIZES.padding.md,
      marginBottom: SIZES.padding.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }, style]}>
      {children}
    </View>
  );
};

export default Card;
