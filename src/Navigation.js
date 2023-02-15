import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login/index.js'

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Login"
                headerMode="none">

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ gestureEnabled: false, }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;