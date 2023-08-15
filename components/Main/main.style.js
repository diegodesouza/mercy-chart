import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '80%',
        width: '100%',
        borderRadius: 30,
    },

    containerUpper: {
        alignItems: 'center',
    },
    textUpper: {
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: 20,
        color: COLORS.primary,
    },

    textLower: {
        marginBottom: 15,
        textTransform: 'uppercase',
        color: COLORS.gray,
    },

    containerLower: {
        alignItems: 'center',
        borderRadius: 35,
        marginTop: SIZES.large,
        backgroundColor: COLORS.primary,
        justifyContent: 'space-evenly',
        // width: '100%',
        height: '65%',
    },

    containerLowerX: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        justifyContent: 'space-around',
        width: '80%',
        height: '25%',
    },

    containerLowerTap: {
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.30)',
        paddingHorizontal: 40,
        paddingVertical: 20,
    },

    insideContainerLowerTxt: {
        fontSize: 30,
        fontWeight: 700,
        color: '#fff',
        textTransform: 'uppercase',
    },

    insideContainerLowerTxtUnder: {
        fontSize: SIZES.medium,
        fontWeight: 700,
        color: '#fff',
    }
})

export default styles;