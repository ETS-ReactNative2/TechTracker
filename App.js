import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();



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
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name='signUp'
          component={SignUp}
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


