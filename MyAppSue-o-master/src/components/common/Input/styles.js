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
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: SIZES.padding.xs,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.md,
    borderWidth: SIZES.borderWidth.thin,
    borderColor: COLORS.border,
    height: SIZES.input.height,
    paddingHorizontal: SIZES.padding.md,
  },
  
  inputContainer_error: {
    borderColor: COLORS.error,
  },
  
  iconContainer: {
    marginRight: SIZES.padding.sm,
  },
  
  input: {
    flex: 1,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
  },
  
  input_withIcon: {
    marginLeft: SIZES.padding.xs,
  },
  
  errorText: {
    fontSize: SIZES.font.small,
    color: COLORS.error,
    marginTop: SIZES.padding.xs,
    marginLeft: SIZES.padding.xs,
  },
});

export default styles;
