/**
 * ESTILOS: TipsScreen
 */

import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  content: {
    flex: 1,
    padding: SIZES.padding.lg,
  },
  
  header: {
    marginBottom: SIZES.padding.xl,
    marginTop: SIZES.padding.md,
  },
  
  title: {
    fontSize: SIZES.font.xxxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.padding.xs,
  },
  
  subtitle: {
    fontSize: SIZES.font.large,
    color: colors.textSecondary,
  },
  
  cardTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: colors.text,
    marginBottom: SIZES.padding.md,
  },
  
  cardText: {
    fontSize: SIZES.font.regular,
    color: colors.textSecondary,
  },
});

export default createStyles;
