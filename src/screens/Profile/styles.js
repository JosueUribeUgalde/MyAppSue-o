/**
 * ESTILOS: ProfileScreen
 * 
 * Estilos de la pantalla de perfil del usuario.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  container: {
    flex: 1,
    padding: SIZES.padding.lg,
  },
  
  header: {
    alignItems: 'center',
    marginTop: SIZES.padding.xl,
    marginBottom: SIZES.padding.xxl,
  },
  
  avatar: {
    width: 80,
    height: 80,
    borderRadius: SIZES.borderRadius.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding.md,
  },
  
  avatarText: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  
  name: {
    fontSize: SIZES.font.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding.xs,
  },
  
  email: {
    fontSize: SIZES.font.regular,
    color: COLORS.textSecondary,
  },
  
  sectionTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.padding.lg,
    marginBottom: SIZES.padding.md,
  },
  
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding.sm,
  },
  
  statLabel: {
    fontSize: SIZES.font.regular,
    color: COLORS.textSecondary,
  },
  
  statValue: {
    fontSize: SIZES.font.regular,
    fontWeight: '600',
    color: COLORS.primary,
  },
  
  divider: {
    height: SIZES.borderWidth.thin,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.padding.xs,
  },
  
  optionText: {
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    fontWeight: '500',
  },
  
  logoutContainer: {
    marginTop: SIZES.padding.xxl,
    marginBottom: SIZES.padding.xl,
  },
});

export default styles;
