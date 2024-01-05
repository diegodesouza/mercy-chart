import React, { useEffect } from 'react'
import { observer } from "mobx-react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { PaperProvider, Button, Text, Avatar } from 'react-native-paper';
import { FormBuilder } from "react-native-paper-form-builder";
import * as ImagePicker from 'expo-image-picker';
import { useForm } from "react-hook-form";
import { useChildStore } from "../stores/ChildStore";
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import { useStorageStore } from "../stores/StorageStore";
import Child from "../stores/models/Child";
import { useNavigation } from "@react-navigation/native";

const AddChild = ({ userId }) => {
    const { setChild, getChildren } = useChildStore();
    const { user } = useAuthenticationStore();
    const { imageURL, pickImage, handleChangeStorageStore } = useStorageStore();
    const navigation = useNavigation();

    useEffect(() => {
        requestImagePermission()

        // cleanup
        return async () => {
            await func();
            handleChangeStorageStore('imageURL', null)
            reset()
        }
    }, []);

    const func = async () => {
        await getChildren(user.uid)
    }

    const {
        control,
        setFocus,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: { name: '' },
        mode: 'onChange',
        reValidateMode: 'onSubmit'
    });

    const requestImagePermission = async () => {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    }

    return (
        <PaperProvider>
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.header}>Add Child</Text>
                    <TouchableOpacity
                        style={{ alignSelf: 'center', borderRadius: 50 }}
                        title="Pick an image from camera roll" onPress={pickImage}>
                        <Avatar.Image
                            size={120}
                            style={{ alignSelf: 'center', marginBottom: 30 }}
                            source={imageURL !== null ? { uri: imageURL } : require('../../assets/icon.png')}
                        />
                    </TouchableOpacity>
                    <FormBuilder
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[
                            {
                                name: 'name',
                                type: 'text',
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Name is required',
                                    },
                                },
                                textInputProps: {
                                    label: 'Name',
                                    outlineStyle: { borderRadius: 20, borderColor: '#FFF', backgroundColor: '#F5F5F5' },
                                    selectionColor: '#F19336',
                                    activeOutlineColor: '#757575'
                                },
                            },
                        ]}
                    />
                    <Button
                        mode="contained"
                        buttonColor='#F19336'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ marginVertical: 20, paddingVertical: 4 }}
                        onPress={handleSubmit(async ({ name }) => {
                            await setChild(user?.uid, new Child({ name }))
                            navigation.navigate('ChildProfile')
                        })}>
                        Add
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor='#757575'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ marginBottom: 20, paddingVertical: 4 }}
                        onPress={() => { navigation.goBack() }}>
                        Cancel
                    </Button>
                </View>
            </View>
        </PaperProvider>
    )
}

export default observer(AddChild)

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1E6E0',
        justifyContent: 'center'
    },
    container: {
        margin: 30,
        padding: 13,
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white'

    },
    header: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 28,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 30
    },


})
