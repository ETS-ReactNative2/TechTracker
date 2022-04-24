import {
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView
} from "react-native";
import React from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { Input, Button, Header } from "react-native-elements";



const LoginScreen = ({ navigation }, props) => {

    const [state, setState] = React.useState({
        email: '',
        password: '',
    })

    const setEmail = (email) => {
        setState({ ...state, email: email });
    };
    const setPassword = (password) => {
        setState({ ...state, password: password });
    };

    const SignUpNav = () => {
        navigation.navigate("signUp");
    };

    const LoginHandler = () => {


        axios.post("http://localhost:3000/auth/login/", { ...state }).then(({ data }) => {

            const data1 = data;

            if (data1.status === "success") {

                (async () => {
                    try {
                        await AsyncStorage.setItem('userToken', data1.token)
                    } catch (error) {
                        console.log(error);
                    }
                })();


                navigation.navigate('Home');

            } else {
                Alert.alert("Login was unsuccessful");
            }
        }).catch((error) => {
            console.log({ name: 'Ryan', object: error })
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                {/* <ImageBackground source={require('../images/background.jpeg')}> */}
                    <Header
                        centerComponent={{ text: `Login`, style: { color: '#fff', fontSize: 24 } }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={SignUpNav}
                    >
                        <Text style={styles.btnText}>Not A User Yet? Sign Up!
                        </Text>
                    </TouchableOpacity>
                    <Text>  </Text>
                    <Input
                        placeholder='email'
                        leftIcon={{ type: "fontisto", name: "email" }}
                        label='Your Email Address'
                        onChangeText={(email) => {
                            setEmail(email);
                        }}
                        value={state.email}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='password'
                        leftIcon={{ type: "entypo", name: "lock" }}
                        label='Your Password'
                        onChangeText={(password) => {
                            setPassword(password);
                        }}
                        value={state.password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    <Text>
                        <Button onPress={() => LoginHandler()} title='Login' />
                    </Text>

                {/* </ImageBackground> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },

    button: {
        width: 200,
        marginTop: 20,
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 50,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
});

export default LoginScreen;

