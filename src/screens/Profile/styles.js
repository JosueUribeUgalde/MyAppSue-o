/**
 * ESTILOS: ProfileScreen
 * 
 * Estilos de la pantalla de perfil del usuario.
 */

import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

const createStyles = (colors) => StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding.md,
  },
  
  avatarText: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  
  name: {
    fontSize: SIZES.font.xLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.padding.xs,
  },
  
  email: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
  },
  
  sectionTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.text,
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
    color: colors.textSecondary,
  },
  
  statValue: {
    fontSize: SIZES.font.regular,
    fontWeight: '600',
    color: colors.primary,
  },
  
  divider: {
    height: SIZES.borderWidth.thin,
    backgroundColor: colors.border,
    marginVertical: SIZES.padding.xs,
  },
  
  optionText: {
    fontSize: SIZES.font.regular,
    color: colors.text,
    fontWeight: '500',
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIcon: {
    marginRight: SIZES.padding.md,
  },

  optionContent: {
    flex: 1,
  },

  optionDescription: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginTop: SIZES.padding.xs / 2,
  },

  loadingStats: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.lg,
  },

  emptyStats: {
    alignItems: 'center',
    paddingVertical: SIZES.padding.lg,
  },

  emptyStatsText: {
    fontSize: SIZES.font.small,
    color: colors.textSecondary,
    marginTop: SIZES.padding.sm,
    textAlign: 'center',
  },

  profileValue: {
    flex: 1,
    marginLeft: SIZES.padding.md,
    textAlign: 'right',
  },

  editProfileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding.sm,
  },

  editProfileAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.padding.xs,
  },

  editProfileForm: {
    marginTop: SIZES.padding.sm,
    paddingTop: SIZES.padding.md,
    borderTopWidth: SIZES.borderWidth.thin,
    borderTopColor: colors.border,
  },

  editActions: {
    flexDirection: 'row',
    gap: SIZES.padding.sm,
    marginTop: SIZES.padding.sm,
  },

  editActionButton: {
    flex: 1,
  },

  editScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding.xl,
    marginBottom: SIZES.padding.xl,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: SIZES.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginRight: SIZES.padding.md,
  },

  editScreenTitleGroup: {
    flex: 1,
  },
  
  logoutContainer: {
    marginTop: SIZES.padding.xxl,
    marginBottom: SIZES.padding.xl,
  },
});

export default createStyles;
