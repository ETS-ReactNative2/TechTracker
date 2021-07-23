import "react-native-gesture-handler";
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/login";
import SignUpPage from "./components/signup";
import HomeScreen from "./components/home";
import SessionScreen from "./components/sessions";
import StatisticsScreen from "./components/statistics";
import InspirationScreen from "./components/blog";

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
        <Stack.Screen name='Home' component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>) :
    (<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
  )
}

const UserScreen = () => {
  return (
      <Drawer.Navigator>
          <Drawer.Screen name='Home' component={HomeScreen} />
          <Drawer.Screen
              name='Sessions'
              component={SessionScreen}
          />
          <Drawer.Screen
              name='Statistics'
              component={StatisticsScreen}   
          />
          <Drawer.Screen 
          name='Inspiration'
          component={InspirationScreen}
          />
      </Drawer.Navigator>
  )
};


