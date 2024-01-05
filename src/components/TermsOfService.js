import React from 'react';
import {useController} from "react-hook-form";
import {Checkbox, Text, HelperText} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from "react-native";

const TermsOfService = (
    {
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control
    }
) => {
    const {field, formState} = useController({
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control
    });
    const errorMessage = formState?.errors?.['termsOfService']?.message;

    return (
        <View style={styles.termsOfCondition}>
            <View style={styles.container}>
                <Checkbox.Android
                    status={field.value}
                    color='#F19336'
                    onPress={() => {
                        field.onChange(field.value === 'checked' ? 'unchecked' : 'checked');
                    }}
                />
                <View style={styles.termsTxtContainer}>
                    <Text style={styles.termsTxt}>
                        By signing up you accept the
                    </Text>
                    <TouchableOpacity Press={() => {}}>
                        <Text onPress={() => { }} style={styles.termsLink}>
                            Terms of Service and Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                errorMessage &&
                <View>
                    <HelperText type={'error'}>{errorMessage}</HelperText>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    termsOfCondition: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flexDirection: 'row',
    },
    termsTxtContainer: {
        paddingTop: 10,
        gap: -5,
    },
    termsTxt: {
        color: '#757575',
        fontFamily: 'OpenSans-Regular',
    },
    termsLink: {
        fontFamily: 'OpenSans-Bold',
        marginTop: 5,
        color: '#F19336'
    },
})

export default TermsOfService