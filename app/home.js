import { SafeAreaView, Text, View } from "react-native";

import { COLORS } from '../constants'
import styles from "./home.style";

import Header from '../components/Header/Header'
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
            <View style={styles.container}>
                <Header />
                <Main />
                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default Home;
