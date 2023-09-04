import * as React from 'react';
import {observer} from "mobx-react";
import { StyleSheet, View, } from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';

const Parent = ({ navigation }) => {
    return (
        <PaperProvider>
            <View style={{ flex: 1, backgroundColor: '#F1E6E0' }}>
                <Text variant="displaySmall" style={styles.header}>Parent</Text>
            </View>
        </PaperProvider>
    );
}

export default observer(Parent);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: '40%',
        textAlign: 'center',
        fontWeight: 600,
        color: '#F19336',
    },
})