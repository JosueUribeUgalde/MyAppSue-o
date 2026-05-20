/**
 * ESTILOS: LoginScreen (EJEMPLO)
 * 
 * Demuestra cómo usar las constantes de colores y tamaños
 * en archivos de estilos separados.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor se aplica dinámicamente desde el componente
  },

  container: {
    flex: 1,
    // backgroundColor se aplica dinámicamente desde el componente
  },
  
  header: {
    paddingHorizontal: SIZES.padding.lg,
    paddingTop: SIZES.padding.xxxl,
    paddingBottom: SIZES.padding.xl,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    marginBottom: SIZES.padding.xs,
    // color se aplica dinámicamente desde el componente
  },
  
  subtitle: {
    fontSize: SIZES.font.large,
    // color se aplica dinámicamente desde el componente
  },
  
  formContainer: {
    paddingHorizontal: SIZES.padding.lg,
  },
  
  loginButton: {
    marginTop: SIZES.padding.lg,
  },
  
  signupButton: {
    marginTop: SIZES.padding.md,
    marginBottom: SIZES.padding.xl,
  },

  recoveryButton: {
    marginTop: SIZES.padding.md,
  },

  statusBox: {
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.md,
    marginTop: SIZES.padding.sm,
  },

  statusText: {
    fontSize: SIZES.font.small,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
