import React from 'react';
import { View, Text, Image, } from 'react-native';
import styles from './header.style'
import CalendarIcon from '../../assets/icons/calendar.svg';
import SettingsIcon from '../../assets/icons/settings.svg';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerLeftItems}>
                <Image source={require('../../assets/images/profile.png')} style={styles.images} />
                <Text style={styles.headerTxt}>Child's Name</Text>
            </View>

            <View style={styles.containerRightItems}>
                <CalendarIcon style={{ padding: 14, marginRight: 18 }} />
                <SettingsIcon style={{ padding: 14 }} />
            </View>
        </View>
    )
}

export default Header;