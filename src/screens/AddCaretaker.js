import React from 'react'
import { View, StyleSheet } from 'react-native'
import { PaperProvider, Button, Text } from 'react-native-paper';
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';


const AddCaretaker = () => {
    const navigation = useNavigation();
    const {
        control,
        setFocus,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            confirmEmail: ''
        },
        mode: 'onChange',
        reValidateMode: 'onSubmit'
    });

    return (
        <PaperProvider>
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.header}>Add Caretaker</Text>
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
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff', backgroundColor: '#F5F5F5' },
                                    selectionColor: '#F19336',
                                    activeOutlineColor: '#757575'
                                },
                            },
                            {
                                name: 'email',
                                type: 'email',
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                    pattern: {
                                        value:
                                            /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                                        message: 'Email is invalid',
                                    },
                                },
                                textInputProps: {
                                    label: 'Email',
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff', backgroundColor: '#F5F5F5' },
                                    selectionColor: '#F19336',
                                    activeOutlineColor: '#757575'
                                },
                            },
                            {
                                name: 'confirmEmail',
                                type: 'email',
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Confirm Email is required',
                                    },
                                    pattern: {
                                        value:
                                            /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                                        message: 'Email is invalid',
                                    },
                                },
                                textInputProps: {
                                    label: 'Confirm Email',
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff', backgroundColor: '#F5F5F5' },
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
                        style={{ marginTop: 20 }}
                        onPress={handleSubmit(({ name, email }) => {
                            console.log(name, email)
                        })}>
                        Add
                    </Button>
                    <Button
                        mode="contained"
                        buttonColor='#757575'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ marginTop: 20 }}
                        onPress={() => { navigation.goBack(); }}>
                        Cancel
                    </Button>
                </View>
            </View>
        </PaperProvider>
    )
}

export default AddCaretaker

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
