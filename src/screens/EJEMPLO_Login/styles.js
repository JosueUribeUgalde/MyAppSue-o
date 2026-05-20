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
    paddingTop: SIZES.padding.xxxl * 1.4,
    paddingBottom: SIZES.padding.xl,
    alignItems: 'center',
  },

  brandMark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: SIZES.borderWidth.thin,
    marginBottom: SIZES.padding.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },

  appName: {
    fontSize: SIZES.font.small,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: SIZES.padding.sm,
  },
  
  title: {
    fontSize: SIZES.font.heading,
    fontWeight: '800',
    marginBottom: SIZES.padding.xs,
    textAlign: 'center',
    // color se aplica dinámicamente desde el componente
  },
  
  subtitle: {
    fontSize: SIZES.font.regular,
    textAlign: 'center',
    // color se aplica dinámicamente desde el componente
  },
  
  formContainer: {
    marginHorizontal: SIZES.padding.lg,
    padding: SIZES.padding.lg,
    borderRadius: SIZES.borderRadius.xl,
    borderWidth: SIZES.borderWidth.thin,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 5,
  },
  
  loginButton: {
    marginTop: SIZES.padding.lg,
  },
  
  signupButton: {
    marginTop: SIZES.padding.md,
    marginBottom: SIZES.padding.sm,
  },

  recoveryButton: {
    marginTop: SIZES.padding.md,
  },

  forgotPasswordLink: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding.md,
    marginBottom: SIZES.padding.xl,
  },

  forgotPasswordText: {
    fontSize: SIZES.font.small,
    fontWeight: '700',
    textAlign: 'center',
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

  passwordPolicyBox: {
    borderRadius: SIZES.borderRadius.md,
    padding: SIZES.padding.md,
    marginTop: -SIZES.padding.xs,
    marginBottom: SIZES.padding.sm,
  },

  passwordPolicyTitle: {
    fontSize: SIZES.font.small,
    fontWeight: '800',
    marginBottom: SIZES.padding.sm,
  },

  passwordRequirementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.padding.sm,
  },

  passwordRequirement: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '46%',
    gap: SIZES.padding.xs,
  },

  passwordRequirementText: {
    flex: 1,
    fontSize: SIZES.font.xSmall,
    fontWeight: '700',
  },
});

export default styles;
