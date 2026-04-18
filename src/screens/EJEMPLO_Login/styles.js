/**
 * ESTILOS: LoginScreen (EJEMPLO)
 * 
 * Demuestra cómo usar las constantes de colores y tamaños
 * en archivos de estilos separados.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: {
    paddingHorizontal: SIZES.padding.lg,
    paddingTop: SIZES.padding.xxxl,
    paddingBottom: SIZES.padding.xl,
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
  
  formContainer: {
    paddingHorizontal: SIZES.padding.lg,
  },
  
  loginButton: {
    marginTop: SIZES.padding.lg,
  },
  
  signupButton: {
    marginTop: SIZES.padding.md,
  },
});

export default styles;
