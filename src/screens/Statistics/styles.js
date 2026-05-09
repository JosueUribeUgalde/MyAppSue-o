import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Usa tu color de fondo definido en la paleta
        backgroundColor: COLORS.background || '#F5F5F5',
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
        color: COLORS.text, // #2C3E50
        marginBottom: SIZES.padding.xs,
    },
    subtitle: {
        fontSize: SIZES.font.large,
        color: COLORS.textSecondary, // #7F8C8D
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