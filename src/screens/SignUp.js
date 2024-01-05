import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { observer } from "mobx-react";
import {PaperProvider, Button, Text, HelperText} from 'react-native-paper';
import { useAuthenticationStore } from "../stores/AuthenticationStore";
import {useForm} from 'react-hook-form';
import {FormBuilder} from 'react-native-paper-form-builder';
import TermsOfService from "../components/TermsOfService";

const SignUp = ({ navigation }) => {
    const { signUp, isSigningUp, emailIsAlreadyInUse} = useAuthenticationStore();

    const {
        control,
        setFocus,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        mode: 'onChange',
        reValidateMode: 'onSubmit'
    });

    const onSignUp = async (name, email, password) => {
        await signUp(name, email, password);
    }

    return (
        <PaperProvider>
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text variant="displaySmall" style={styles.header}>Sign Up</Text>
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
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff' },
                                    selectionColor:'#F19336',
                                    activeOutlineColor:'#757575'
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
                            {
                                name: 'confirmPassword',
                                type: 'password',
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Password Confirmation is required',
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
                                    label: 'Confirm Password',
                                    outlineStyle: { borderRadius: 20, borderColor: '#fff' },
                                    selectionColor:'#F19336',
                                    activeOutlineColor:'#757575'
                                },
                            },
                            {
                                name: 'termsOfService',
                                type: 'custom',
                                JSX: TermsOfService,
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'This field is required.',
                                    },
                                },
                            },
                        ]}
                    />
                    {
                        emailIsAlreadyInUse &&
                        <View>
                            <HelperText type="error">An account with this email already exists.</HelperText>
                        </View>
                    }
                    <Button
                        mode="contained"
                        buttonColor='#F19336'
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 16 }}
                        style={{ marginTop: 20 }}
                        loading={isSigningUp}
                        onPress={handleSubmit(({name, email, password}) => {
                            onSignUp(name, email, password)
                        })}>
                        Sign Up
                    </Button>

                    <View style={styles.bottomTxtContainer}>
                        <Text style={{ color: '#757575', fontFamily: 'OpenSans-Regular', }}>
                            Already have an account?
                        </Text>

                        <Button
                            mode="text"
                            textColor='#F19336'
                            compact
                            labelStyle={{ fontWeight: 'bold', alignSelf: 'flex-end', fontFamily: 'OpenSans-Bold', }}
                            onPress={() => navigation.navigate('SignIn')}>
                            Sign In
                        </Button>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

export default observer(SignUp)

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
        fontWeight: 'bold',
        color: '#757575',
        fontFamily: 'OpenSans-Bold'
    },
    bottomTxtContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
    }
})
