import {NavigationContainer} from "@react-navigation/native";
import {LoginPage} from "../components/LoginPage";
import {RegistrationPage} from "../components/RegistrationPage";
import {MainPage} from "../components/MainPage";
import React, {useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


export default function GeneralComponent(){
    const [isLogIn, setIsLogIn] = useState(false)
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            {!isLogIn ?
                <Stack.Navigator>
                    <Stack.Screen
                        name='Login'
                    >
                        {props => <LoginPage
                            {...props}
                            changeState={setIsLogIn}
                        />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Registration'
                        component={RegistrationPage}
                    />
                    <Stack.Screen
                        name='Main'>
                        {props => <MainPage {...props} changeState={setIsLogIn}/>}
                    </Stack.Screen>
                </Stack.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name='Main'>
                        {props => <MainPage {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}