/**
 * ESTILOS: CustomInput
 * 
 * Estilos del componente CustomInput.
 * Define el aspecto visual de los campos de texto.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding.md,
  },
  
  label: {
    fontSize: SIZES.font.medium,
    fontWeight: '600',
    marginBottom: SIZES.padding.xs,
    // Color se aplica dinámicamente desde el componente
  },
  
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  input: {
    flex: 1,
    fontSize: SIZES.font.regular,
    borderRadius: SIZES.borderRadius.md,
    borderWidth: SIZES.borderWidth.thin,
    height: SIZES.input.height,
    paddingHorizontal: SIZES.padding.md,
    // Color, backgroundColor y borderColor se aplican dinámicamente desde el componente
  },
  
  inputWithIcon: {
    paddingRight: SIZES.padding.xxxl + SIZES.padding.md, // Espacio para el icono
  },
  
  eyeIcon: {
    position: 'absolute',
    right: SIZES.padding.md,
    height: SIZES.input.height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.sm,
  },
  
  inputError: {
    // borderColor se aplica dinámicamente desde el componente
  },
  
  errorText: {
    fontSize: SIZES.font.small,
    marginTop: SIZES.padding.xs,
    marginLeft: SIZES.padding.xs,
    // Color se aplica dinámicamente desde el componente
  },
});

export default styles;
