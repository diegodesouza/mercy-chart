import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import {useForm} from 'react-hook-form';
import {FormBuilder} from 'react-native-paper-form-builder';
import { PaperProvider, Button, Text } from 'react-native-paper';
import { observer } from "mobx-react";
import { useFonts } from 'expo-font';

const SignIn = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
    });

    const { signIn } = useAuthenticationStore();

    const {
        control,
        setFocus,
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        reValidateMode: 'onSubmit'
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <PaperProvider>
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text variant="displaySmall" style={styles.header}>Sign In</Text>
                    <FormBuilder
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[
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
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff' },
                                    selectionColor:'#F19336',
                                    activeOutlineColor:'#757575'
                                },
                            },
                            {
                                name: 'password',
                                type: 'password',
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password should be atleast 8 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Password should be between 8 and 30 characters',
                                    },
                                },
                                textInputProps: {
                                    label: 'Password',
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff' },
                                    selectionColor:'#F19336',
                                    activeOutlineColor:'#757575'
                                },
                            },
                        ]}
                    />
                    <TouchableOpacity>
                        <Text
                            style={{ alignSelf: 'flex-end', fontFamily: 'OpenSans-Regular', marginTop: 10, color: '#757575' }}
                            onPress={() => navigation.navigate('AddCaretaker')}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <Button
                        mode="contained"
                        buttonColor='#F19336'
                        labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        style={{ marginTop: 20, paddingVertical: 3 }}
                        onPress={handleSubmit(({email, password}) => {
                            signIn(email, password)
                        })}>
                        Sign In
                    </Button>

                    <View style={styles.bottomTxtContainer}>
                        <Text
                            style={{ color: '#757575', fontFamily: 'OpenSans-Regular' }}
                        >
                            Don't have an account yet?
                        </Text>
                        <Button
                            mode="text"
                            textColor='#F19336'
                            compact
                            labelStyle={{ fontFamily: 'OpenSans-Bold' }}
                            onPress={() => navigation.navigate('SignUp')}>
                            Sign Up
                        </Button>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

export default observer(SignIn);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1E6E0',
        justifyContent: 'center'
    },
    container: {
        margin: 30,
    },
    header: {
        paddingBottom: '5%',
        textAlign: 'left',
        fontFamily: 'OpenSans-Bold',
        color: '#757575',
    },
    helperTxt: {
        color: '#D92D00',
        fontFamily: 'OpenSans-Bold',

    },
    bottomTxtContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
    },
})
