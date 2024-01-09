import * as React from 'react';
import { observer } from "mobx-react";
import { StyleSheet, View, } from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';

const Calendar = ({ navigation }) => {
    return (
        <PaperProvider>
            <View style={{ flex: 1, backgroundColor: '#F1E6E0' }}>
                <Text variant="displaySmall" style={styles.header}>History</Text>
            </View>
        </PaperProvider>
    );
}

export default observer(Calendar);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: '40%',
        textAlign: 'center',
        fontWeight: 600,
        color: '#F19336',
    },
})
