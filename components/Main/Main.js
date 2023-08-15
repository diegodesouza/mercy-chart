import { View, Text, Image, } from 'react-native';
import styles from './main.style'

const Main = () => {
    return (
        <View style={styles.container}>

            <View style={styles.containerUpper}>
                <Text style={styles.textUpper}>01:12:00 Hour</Text>
                <Text style={styles.textLower}>Remaining for the reward</Text>
                <Image source={require('../../assets/images/trophy.png')} />
            </View>

            <View>
                <View style={styles.containerLower}>
                    <View style={styles.containerLowerX}>
                        <Image source={require('../../assets/images/circleX.png')} style={{ width: 40, height: 40 }} />
                        <Image source={require('../../assets/images/circleX.png')} style={{ width: 40, height: 40 }} />
                        <Image source={require('../../assets/images/circleX.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <View style={styles.containerLowerTap}>
                        <Text style={styles.insideContainerLowerTxt}>Double Tap</Text>
                        <Text style={styles.insideContainerLowerTxtUnder}>to add a strike</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Main;