import { View, Text, Image, } from 'react-native';
import styles from './footer.style';
import Slider from '../../assets/icons/slider.svg';

const Footer = () => {
    return (
        <View style={styles.container}>
            <Slider />
            <Text style={styles.containerTxt} >slide to remove one strike</Text>
        </View>
    )
}

export default Footer;