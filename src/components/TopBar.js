import { List } from 'react-native-paper';
import { observer } from "mobx-react";
import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import {useChildStore} from "../stores/ChildStore";

const TopBar = () => {
    const childStore = useChildStore();
    const {children, child, getChild} = childStore;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ paddingHorizontal: 16, }}>
                <List.Accordion
                    id={child.id}
                    title={child.name}
                    titleStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'center', color: '#757575' }}
                    rippleColor='#F5F5F5'
                    style={{ backgroundColor: '#fff' }}
                    left={
                        props => <List.Icon {...props}
                            icon="account-circle"
                            color='#757575' />
                    }>
                    {
                        children &&
                        children.length > 0 &&
                        children
                            .filter(c => c.uid !== child.uid)
                            .map(_child => (
                                <List.Item
                                    key={_child.uid}
                                    title={_child.name}
                                    left={props => <List.Icon {...props} icon="account-circle" />}
                                    titleStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'center', color: '#757575' }}
                                    onPress={ async () => await getChild(_child.uid)}
                                />
                        ))

                    }
                </List.Accordion>
            </View>
        </SafeAreaView>
    );
}

export default observer(TopBar)

const styles = StyleSheet.create({
    safeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff',
    }
})
