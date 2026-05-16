/**
 * ESTILOS: BottomTabBar
 * 
 * Estilos para la barra de navegación inferior.
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: SIZES.padding.sm,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding.xs,
  },

  tabLabel: {
    fontSize: SIZES.font.xSmall,
    color: COLORS.textSecondary,
    marginTop: SIZES.padding.xs,
  },

  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default styles;
