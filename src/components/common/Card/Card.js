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
import styles from './styles';

const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export default Card;
