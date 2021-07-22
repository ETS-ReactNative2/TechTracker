import "react-native-gesture-handler";
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/login";
import SignUpPage from "./components/signup";
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';

// const Navigator = FluidNavigator({
//   login: { screen: LoginScreen },
//   signup: { screen: RegisterScreen },
// });

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



export default function App() {
  const [state, setState] = useState({
    token: null,
  });

  React.useEffect(() => {
    (async () => {
      let userToken = await AsyncStorage.getItem("userToken");

      setState({ token: userToken });
    })();
  }, []);

  return (!state.token ?
    (<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='loginPage'
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name='signUp'
          component={SignUpPage}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen name='home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>) :
    (<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
  )
}


