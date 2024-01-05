import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Button, PaperProvider, Text } from 'react-native-paper';
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { observer } from 'mobx-react';

const Settings = () => {
    const [modalVisible, setModalVisible] = React.useState()
    const { signOut } = useAuthenticationStore();
    const navigation = useNavigation();
    const showModalDelete = () => setModalVisible(true);
    const hideModalDelete = () => setModalVisible(false);
    return (
        <PaperProvider>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModalDelete} style={styles.modalContainer} >
                    <Text style={styles.modalTxt}>Are you sure you want to delete your account?</Text>
                    <Button mode='contained' buttonColor='#757575' >Yes</Button>
                    <Button mode='contained' buttonColor='#F19336' style={{ marginTop: 15 }}>No</Button>
                </Modal>
            </Portal>
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.header}>Profiles</Text>
                    <View style={styles.profilesContainer}>
                        <Button
                            icon='chevron-right'
                            labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 20, color: '#757575' }}
                            contentStyle={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                            onPress={() => navigation.navigate('ChildProfile')}>
                            Children Profiles
                        </Button>
                        <Button
                            style={{ marginTop: 10 }}
                            icon='chevron-right'
                            labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 20, color: '#757575' }}
                            contentStyle={{ flexDirection: 'row-reverse', alignSelf: 'flex-start' }}
                            onPress={() => navigation.navigate('CaretakerProfile')}>
                            Caretakers Profiles
                        </Button>
                    </View>
                    <Button
                        mode="contained"
                        buttonColor='#D92D00'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ paddingVertical: 3 }}
                        onPress={() => signOut()}>
                        Sign out
                    </Button>
                    <Button
                        mode="contained"
                        buttonColor='#757575'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ marginTop: 10, paddingVertical: 3 }}
                        onPress={showModalDelete}>
                        Delete Account
                    </Button>
                </View>
            </View>
        </PaperProvider>
    );
}

export default observer(Settings);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1E6E0',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginTop: 80,
        margin: 30,
        padding: 13,
        justifyContent: 'space-between',
        borderRadius: 30,
        backgroundColor: 'white'
    },
    header: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        color: '#757575',
        textAlign: 'center',
        marginTop: 15,
    },
    profilesContainer: {
        flex: 1,
        padding: 15,
        marginHorizontal: 13,
        marginVertical: '10%',
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    modalContainer: {
        height: 250,
        padding: 15,
        marginHorizontal: 13,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    modalTxt: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    }
})