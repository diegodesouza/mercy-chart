import * as React from 'react';
import { observer } from "mobx-react";
import { StyleSheet, View, Pressable } from 'react-native';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import { IconButton, PaperProvider, Text } from 'react-native-paper';
import TopBar from '../components/TopBar'
import SwipeButton from 'rn-swipe-button';
import {useStrikeStore} from "../stores/StrikeStore";
import {useEffect} from "react";
import {useChildStore} from "../stores/ChildStore";
import {useAuthenticationStore} from "../stores/AuthenticationStore";

const Chart = () => {
    const strikeStore = useStrikeStore()
    const childStore = useChildStore();
    const authenticationStore = useAuthenticationStore();
    const { user } = authenticationStore;
    const { child, getChildren} = childStore;
    const {
        strikes,
        strikeIndex,
        getStrikes,
        setStrike,
        deleteStrike,
        handleChangeStrikeStore,
    } = strikeStore

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .shouldCancelWhenOutside(true)
        .runOnJS(true)
        .onStart( () => {
            handleChangeStrikeStore('strikeIndex', strikeIndex + 1)
            setStrike(child.uid)
        });

    const RemoveIcon = () => <IconButton icon='minus-circle' size={75} iconColor="#757575"/>

    useEffect(() => {
        getChildren(user.uid).then(() => {
            getStrikes(child.uid)
        })
    }, []);

    return (
        <PaperProvider>
            <TopBar />
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.timerContainer}>
                        <View>
                            <Text style={styles.hourTxt}>01:12:00 Hour</Text>
                            <Text>Remaining for the reward</Text>
                        </View>
                        <IconButton icon='timer' iconColor='#757575' onPress={() => { }} />
                    </View>
                    <IconButton
                        icon='gift'
                        size={120}
                        iconColor='#FFD426'
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center'
                        }}
                    />
                    <View style={styles.strikesContainer}>
                        <View style={styles.xContainer}>
                            {
                                strikes &&
                                strikes.length > 0 &&
                                strikes.map(strike => (
                                    <IconButton
                                        key={strike?.uid}
                                        index={strike?.index}
                                        id={strike?.uid}
                                        icon={strike.strike ? 'close-circle-outline' : strike?.icon}
                                        size={60}
                                        iconColor='#FFF'
                                    />
                                ))
                            }
                        </View>
                        <GestureDetector gesture={doubleTap}>
                            <Pressable style={styles.tapContainer} onPress={() => { }}>
                                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 28, color: '#FFF' }}>Double Tap</Text>
                                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, color: '#FFF' }}>to add a strike</Text>
                            </Pressable>
                        </GestureDetector>
                    </View>
                    <SwipeButton
                        containerStyles={{
                            height: 35,
                            alignItems: 'stretch',
                            borderRadius: 20,
                            marginTop: '15%',
                            backgroundColor: '#FFF',
                        }}
                        thumbIconStyles={{
                            width: 75,
                            height: 75,
                        }}
                        thumbIconBackgroundColor="#F1E6E0"
                        thumbIconComponent={RemoveIcon}
                        thumbIconBorderColor="#757575"
                        railBackgroundColor="#F1E6E0"
                        railBorderColor="#F1E6E0"
                        railFillBackgroundColor="#F19336"
                        railFillBorderColor="#F1E6E0"
                        resetAfterSuccessAnimDelay={3}
                        resetAfterSuccessAnimDuration={3}
                        screenReaderEnabled
                        shouldResetAfterSuccess
                        onSwipeSuccess={() => {
                            deleteStrike()
                        }}
                        height={30}
                        titleColor="#757575"
                        title="Slide to remove one strike"
                    />
                </View>
            </View>
        </PaperProvider>
    );
}

export default observer(Chart);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1E6E0',
        justifyContent: 'center'
    },
    container: {
        height: '80%',
        marginTop: 50,
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white'
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    hourTxt: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: '#F19336'
    },
    strikesContainer: {
        borderRadius: 20,
        backgroundColor: '#F19336'
    },
    xContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tapContainer: {
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5B372',
    },
})
