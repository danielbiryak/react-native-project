import {NavigationContainer} from "@react-navigation/native";
import {LoginPage} from "../components/LoginPage";
import {RegistrationPage} from "../components/RegistrationPage";
import {MainPage} from "../components/MainPage";
import React, {useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


export default function GeneralComponent() {
    const [userId, setUserId] = useState(0)
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            {userId == 0 ?
                <Stack.Navigator>
                    <Stack.Screen name='Login'>
                        {
                            props => <LoginPage
                                {...props}
                                setUserId={setUserId}
                            />
                        }
                    </Stack.Screen>
                    <Stack.Screen
                        name='Registration'
                        component={RegistrationPage}
                    />
                </Stack.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name='Main'>
                        {props => <MainPage {...props}
                                            userId={userId}
                                            setUserId={setUserId}
                        />}
                    </Stack.Screen>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}