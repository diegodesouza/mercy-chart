import * as React from 'react';
import { StyleSheet, View, } from 'react-native';

import { PaperProvider, Button, Text, TextInput } from 'react-native-paper';

export default function SignIn({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <PaperProvider>
            <View style={{ flex: 1, backgroundColor: '#F1E6E0' }}>
                <Text variant="displaySmall" style={styles.header}>Sign In</Text>

                <View style={styles.container}>
                    <TextInput
                        mode='outlined'
                        label="Email"
                        value={email}
                        clearTextOnFocus
                        onChangeText={email => setEmail(email)}
                        outlineStyle={{ borderRadius: 20, borderColor: '#fff' }}
                        selectionColor='#F19336'
                        style={{ marginBottom: 5 }}
                    />
                    <TextInput
                        mode='outlined'
                        label="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={password => setPassword(password)}
                        outlineStyle={{ borderRadius: 20, borderColor: '#fff' }}
                    />
                    <Button
                        mode="text"
                        textColor='#757575'
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => navigation.navigate('')}>
                        Forgot Password?
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor='#F19336'
                        labelStyle={{ fontWeight: 700, fontSize: 20 }}
                        style={{ marginTop: 20 }}
                        onPress={() => { }}>
                        Sign In
                    </Button>

                    <View style={styles.bottomTxtContainer}>
                        <Text style={{ fontWeight: 700, color: '#757575' }}>
                            Don't have an account yet?
                        </Text>
                        <Button
                            mode="text"
                            textColor='#F19336'
                            compact
                            labelStyle={{ fontWeight: 700, alignSelf: 'flex-end', }}
                            onPress={() => navigation.navigate('SignUp')}>
                            Sign Up
                        </Button>
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        margin: 30,
    },
    header: {
        flex: 1,
        paddingTop: '40%',
        textAlign: 'center',
        fontWeight: 600,
        color: '#F19336',
    },
    bottomTxtContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 90
    },
})

