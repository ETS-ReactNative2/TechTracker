import React from 'react';
import axios from 'axios';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
} from "react-native";
import { Input, Header } from "react-native-elements";


const SignUpPage = ({ navigation }, props) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        currentcourse: ''
    })

    const setEmail = (email) => {
        setState({ ...state, email: email })
    }
    const setPassword = (password) => {
        setState({ ...state, password: password })
    }
    const setFirstname = (firstname) => {
        setState({ ...state, firstname: firstname })
    }
    const setLastname = (lastname) => {
        setState({ ...state, lastname: lastname })
    }

    const Submit = () => {

        axios.post("http://localhost:3000/auth/signup", { ...state })

            .then(({ data }) => {

                if (data.status == "success") {
                    Alert.alert("Successful sign up")
                    navigation.navigate('loginPage');
                }
                else {
                    Alert.alert("Try signup again")
                }
            })

    }


    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <Header 
                centerComponent={{ text: `Sign Up Here`, style: { color: '#fff' } }}
                />
                <Input
                    label='Your First name'
                    value={state.firstname}
                    onChangeText={(firstname) => setFirstname(firstname)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    label='Your Last name'
                    value={state.lastname}
                    onChangeText={(lastname) => setLastname(lastname)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    value={state.email}
                    leftIcon={{ type: 'fontisto', name: 'email' }}
                    label='Your Email Address'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}

                />
                <Input
                    leftIcon={{ type: 'entypo', name: 'lock' }}
                    label='Your Password'
                    value={state.password}
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={Submit}
                >
                    <Text style={styles.btnText}>Create User
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

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

export default SignUpPage;