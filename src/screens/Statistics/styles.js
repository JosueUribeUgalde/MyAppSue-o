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
    weekRange: {
        fontSize: SIZES.font.small,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: SIZES.padding.lg,
        fontStyle: 'italic',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZES.padding.md,
        marginBottom: SIZES.padding.lg,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: colors.surface,
        padding: SIZES.padding.lg,
        borderRadius: SIZES.borderRadius.md,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    statLabel: {
        fontSize: SIZES.font.small,
        color: colors.textSecondary,
        marginBottom: SIZES.padding.xs,
        textAlign: 'center',
    },
    statValue: {
        fontSize: SIZES.font.xxLarge,
        fontWeight: 'bold',
        color: colors.primary,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding.xxl,
        backgroundColor: colors.surface,
        borderRadius: SIZES.borderRadius.lg,
        marginBottom: SIZES.padding.lg,
    },
    emptyStateTitle: {
        fontSize: SIZES.font.xLarge,
        fontWeight: '600',
        color: colors.text,
        marginTop: SIZES.padding.md,
        marginBottom: SIZES.padding.xs,
    },
    emptyStateText: {
        fontSize: SIZES.font.regular,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding.xxl,
    },
});

export default createStyles;