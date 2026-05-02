/**
 * ESTILOS: HistoryScreen
 */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
    marginBottom: SIZES.padding.xs,
  },
  
  subtitle: {
    fontSize: SIZES.font.large,
    color: COLORS.textSecondary,
  },
  
  cardTitle: {
    fontSize: SIZES.font.large,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding.md,
  },
  
  cardText: {
    fontSize: SIZES.font.regular,
    color: COLORS.textSecondary,
  },
});

export default styles;
