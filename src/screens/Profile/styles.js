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
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.borderRadius.full,
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

  avatarPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding.sm,
  },

  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SIZES.padding.lg,
    paddingTop: SIZES.padding.xs,
    paddingBottom: SIZES.padding.sm,
  },

  avatarOption: {
    width: '47%',
    borderWidth: SIZES.borderWidth.medium,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.md,
    alignItems: 'center',
  },

  avatarOptionImageFrame: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: SIZES.borderWidth.thin,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },

  avatarOptionImage: {
    width: '100%',
    height: '100%',
  },

  avatarOptionFooter: {
    minHeight: 28,
    marginTop: SIZES.padding.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.padding.xs,
  },

  avatarOptionLabel: {
    fontSize: SIZES.font.small,
    fontWeight: '700',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  avatarModal: {
    width: '100%',
    maxWidth: 430,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.lg,
  },

  confirmModal: {
    width: '100%',
    maxWidth: 360,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.padding.xl,
    alignItems: 'center',
  },

  confirmIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding.md,
  },

  confirmMessage: {
    marginTop: SIZES.padding.sm,
    fontSize: SIZES.font.regular,
    textAlign: 'center',
  },

  confirmActions: {
    flexDirection: 'row',
    gap: SIZES.padding.sm,
    marginTop: SIZES.padding.xl,
    width: '100%',
  },

  confirmButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: SIZES.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding.md,
  },

  confirmButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: SIZES.borderWidth.medium,
  },

  confirmButtonText: {
    fontSize: SIZES.font.regular,
    fontWeight: '700',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding.md,
  },

  modalTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '700',
  },

  modalSubtitle: {
    fontSize: SIZES.font.small,
    marginTop: SIZES.padding.xs / 2,
  },

  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalSavingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.padding.sm,
    marginBottom: SIZES.padding.sm,
  },

  modalSavingText: {
    fontSize: SIZES.font.small,
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
