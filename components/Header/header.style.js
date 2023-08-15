import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
    },

    containerLeftItems: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    containerRightItems: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    images: {
        width: SIZES.xxLarge,
    },
    headerTxt: {
        fontSize: SIZES.large,
        fontWeight: 600,
        paddingLeft: 10,
        color: COLORS.gray,
    },

})

export default styles;