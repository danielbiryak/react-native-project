import React, {useState} from 'react'
import {LoginPage} from "./components/LoginPage"
import {MainPage} from "./components/MainPage"
import {RegistrationPage} from "./components/RegistrationPage"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from "@react-navigation/native";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"

export default function App() {
    const Stack = createNativeStackNavigator()
    const [localhost, setLocalhost] = useState('')

    const client = new ApolloClient({
        uri: `http://${localhost}:3000/graphql`,
        cache: new InMemoryCache()
    })

    const [isLogIn, setIsLogIn] = useState(false)

    return (
        <NavigationContainer>
            {!isLogIn ?
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                >
                    {props => <LoginPage {...props} changeState={setIsLogIn} />}
                </Stack.Screen>
                <Stack.Screen
                    name='Registration'
                    component={RegistrationPage}
                />
                <Stack.Screen
                    name='Main' >
                    {props => <MainPage {...props} changeState={setIsLogIn} />}
                </Stack.Screen>
            </Stack.Navigator>
                :
            <Stack.Navigator>
                <Stack.Screen name='Main' component={MainPage} />
            </Stack.Navigator>
            }
        </NavigationContainer>
    )
}